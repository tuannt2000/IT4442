<?php

namespace App\Services\Api;

use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Contracts\Services\Api\RequestServiceInterface;
use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Contracts\Services\Api\CommentServiceInterface;
use App\Contracts\Services\Api\RequestChangeHistoryServiceInterface;
use App\Contracts\Repositories\RequestChangeHistoryRepositoryInterface;
use App\Contracts\Services\Api\RequestChangeDetailServiceInterface;
use App\Contracts\Repositories\RequestChangeDetailRepositoryInterface;
use App\Services\AbstractService;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\Request;
use App\Models\Role;
use App\Models\Comment;
use App\Models\RequestChangeHistory;
use App\Models\RequestChangeDetail;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use App\Mail\SendMailUpdate;
use resources\lang\vn\messages;
use App\Mail\SendMailDueDate;

class RequestService extends AbstractService implements RequestServiceInterface
{
    /**
     * @var RequestRepositoryInterface
     */
    protected $requestRepository;

    /**
     * RequestService constructor.
     * @param RequestRepositoryInterface $requestRepository
     */
    public function __construct(
        RequestRepositoryInterface $requestRepository,
        CommentRepositoryInterface $commentRepository,
        RequestChangeHistoryRepositoryInterface $requestChangeHistoryRepository,
        RequestChangeDetailRepositoryInterface $requestChangeDetailRepository
    ) {
        $this->requestRepository = $requestRepository;
        $this->commentRepository = $commentRepository;
        $this->requestChangeHistoryRepository = $requestChangeHistoryRepository;
        $this->requestChangeDetailRepository = $requestChangeDetailRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params)
    {
        $data = [
            'per_page' => 10,
        ];
        $params = array_merge($data, $params);
        $requests = $this->requestRepository
            ->getColumns([
                'id', 'name', 'content', 'assignee', 'level',
                'due_date', 'status_request', 'user_id', 'category_id'
            ], [
                'user:id,name,email,status,deparment_id',
                'category:id,name,status', 'assigneeTo:id,name'
            ])
            ->where('status_request', '!=', Request::STATUS_REQUEST_CLOSE)
            ->paginate($params['per_page']);
        if ($requests) {
            return [
                'code' => 200,
                'total_record' => $requests->count(),
                'data' => $requests
            ];
        }
    }

    /**
     * @param $params
     * @return array
     */
    public function store($params)
    {
        $data['author_id'] = Auth::user()->id;
        $request = $this->requestRepository->store($params);
        $paramshistory = [
            'content_change' => 'Create Request',
            'type' => "create",
            'request_id' => $request->id,
            'user_id' => $data['author_id']
        ];
        $this->createHistory($paramshistory);
        $mail = [
            'nameUpdate' => Auth::user()->name,
            'title' => trans('messages.requestTitleCreate') . date("d/m/y"),
            'content' => $request->content,
            'level' => $request->level,
            'authorName' => $request->user->name,
            'authorEmail' => $request->user->email,
            'assigneeName' => $request->assigneeTo->name,
            'assigneeEmail' => $request->assigneeTo->email,
            'dueDate' => $request->due_date,
            'statusRequest' => $request->status_request,
            'requestName' => $request->name,
            'urlDetailRequest' => config('app.requestUrl') . 'requestDetail/' . $request->id,
            'email' => [
                $request->user->email,
                $request->assigneeTo->email
            ]
        ];
        try {
            Mail::send(new SendMail($mail));
            return [
                'code' => 200,
                'message' => trans('messages.storeSuccess'),
                'data' => $request->id,
            ];
        } catch (\Throwable $th) {
            return ([
                'code' => 200,
                'message' => trans('messages.requestSuccessSendMailFailt'),
                'data' => $request->id,
            ]);
        }
    }

    /**
     * @param int $id
     * @return array
     */
    public function show($id)
    {
        return $this->requestRepository->find($id)
            ->with('user:id,name,email,status,deparment_id', 'category:id,name,status', 'assigneeTo:id,name')
            ->where('id', $id)->get();
    }

    /**
     * @param int $id, $data
     * @return bool|mixed
     */
    public function update($data, $id)
    {
        $oldRequest = $this->requestRepository->find($id);
        $data['idAuthor'] = Auth::user()->id;
        $roleAuthor = Auth::user()->role->id;
        $status = $this->requestRepository->find($id)->status_request;
        $nameUserUpdate = Auth::user()->name;
        $deparment_id = Auth::user()->deparment_id;

        if (($status == Request::STATUS_REQUEST_OPEN && $data['idAuthor'] == $oldRequest->user->id)
            || ($roleAuthor == Role::ROLE_ADMIN && $data['idAuthor'] == $oldRequest->assignee)
            || ($roleAuthor == Role::ROLE_MANAGER && $status == Request::STATUS_REQUEST_OPEN
                && $deparment_id == $oldRequest->user->deparment_id)
        ) {
            $request = $this->requestRepository->find($id)->update($data);
        } else {
            return [
                'code' => 400,
                'message' => trans('messages.updatePermission'),
            ];
        }
        $newRequest = $this->requestRepository->find($id);
        $dataHistory = [
            'content_change' => "Update Request",
            'type' => 'update',
            'request_id' => $oldRequest->id,
            'user_id' => $data['idAuthor'],
        ];
        $contentComment = $this->differentRequest($oldRequest, $newRequest);
        if (!empty($contentComment)) {
            $requestChange = $this->requestChangeHistoryRepository->store($dataHistory);
            $contentHistoryDetail = $this->differentRequestChange($oldRequest, $newRequest, $data, $requestChange);
            if (!empty($contentHistoryDetail)) {
                $this->createHistoryDeatil($contentHistoryDetail);
            }
        } else {
            return [
                'code' => 200,
                'message' => trans('messages.updateEmpty'),
            ];
        }
        $params = [
            'content' => json_encode($contentComment),
            'request_id' => $oldRequest->id,
            'user_id' => $data['idAuthor']
        ];
        $mail = [
            'title' => trans('messages.requestTitleUpdate') . date("d/m/y"),
            'nameUserRequest' => $nameUserUpdate,
            'requestName' => $oldRequest->name,
            'authorName' => $oldRequest->user->name,
            'content' => $contentComment,
            'urlDetailRequest' => config('app.requestUrl') . 'requestDetail/' . $oldRequest->id,
            'email' => [
                $oldRequest->user->email,
                $newRequest->assigneeTo->email,
                $oldRequest->assigneeTo->email
            ]
        ];

        if (($status == Request::STATUS_REQUEST_OPEN && $data['idAuthor'] == $oldRequest->user->id)
            || ($roleAuthor == Role::ROLE_ADMIN && $data['idAuthor'] == $oldRequest->assignee)
            || ($roleAuthor == Role::ROLE_MANAGER && $status == Request::STATUS_REQUEST_OPEN
                && $deparment_id == $oldRequest->user->deparment_id)
        ) {
            try {
                Mail::send(new SendMailUpdate($mail));
                return [
                    'code' => 200,
                    'message' => trans('messages.updateSuccess'),
                    'request' =>  $this->requestRepository->find($id)->update($data),
                ];
            } catch (\Throwable $th) {
                return [
                    'code' => 200,
                    'message' => trans('messages.eidtSuccessSendMailFailt'),
                    'request' =>  $this->requestRepository->find($id)->update($data),
                ];
            }
        } else {
            return [
                'code' => 400,
                'message' => trans('messages.updatePermission'),
            ];
        }
    }

    public function differentRequest($oldRequest, $newRequest)
    {
        $contentComment = [];
        if ($oldRequest->name != $newRequest->name) {
            $contentComment['Name request'] = " {$oldRequest->name}  đã sửa thành  {$newRequest->name} ";
        }

        if ($oldRequest->content != $newRequest->content) {
            $contentComment['Content request'] = " {$oldRequest->content} đã sửa thành {$newRequest->content} ";
        }

        if ($oldRequest->category_id != $newRequest->category_id) {
            $contentComment['Category request'] = " {$oldRequest->category->name} 
            đã sửa thành {$newRequest->category->name} ";
        }

        if ($oldRequest->assignee != $newRequest->assignee) {
            $contentComment['Assignee request'] = " {$oldRequest->assigneeTo->name} 
            đã sửa thành {$newRequest->assigneeTo->name} ";
        }

        if ($oldRequest->level != $newRequest->level) {
            if ($newRequest->level == Request::LEVEL_LOW) {
                $levelRequest = 'Level Low';
            } elseif ($newRequest->level == Request::LEVEL_MEDIUM) {
                $levelRequest = 'Level Medium';
            } elseif ($newRequest->level == Request::LEVEL_HIGH) {
                $levelRequest = 'Level High';
            }

            if ($oldRequest->level == Request::LEVEL_LOW) {
                $levelRequestOld = 'Level Low';
            } elseif ($oldRequest->level == Request::LEVEL_MEDIUM) {
                $levelRequestOld = 'Level Medium';
            } elseif ($oldRequest->level == Request::LEVEL_HIGH) {
                $levelRequestOld = 'Level High';
            }
            $contentComment['Level request'] = " {$levelRequestOld} đã sửa thành {$levelRequest} ";
        }

        if ($oldRequest->status_request != $newRequest->status_request) {
            if ($newRequest->status_request == Request::STATUS_REQUEST_OPEN) {
                $statusRequest = 'Open';
            } elseif ($newRequest->status_request == Request::STATUS_REQUEST_INPROGRESS) {
                $statusRequest = 'In Progress';
            } elseif ($newRequest->status_request == Request::STATUS_REQUEST_CLOSE) {
                $statusRequest = 'Close';
            }

            if ($oldRequest->status_request == Request::STATUS_REQUEST_OPEN) {
                $statusRequestOld = 'Open';
            } elseif ($oldRequest->status_request == Request::STATUS_REQUEST_INPROGRESS) {
                $statusRequestOld = 'In Progress';
            } elseif ($oldRequest->status_request == Request::STATUS_REQUEST_CLOSE) {
                $statusRequestOld = 'Close';
            }
            $contentComment['Status request'] = " {$statusRequestOld} 
            đã sửa thành {$statusRequest} ";
        }

        if ($oldRequest->due_date != $newRequest->due_date) {
            $contentComment['Due date'] = " {$oldRequest->due_date} đã sửa thành {$newRequest->due_date} ";
        }

        return $contentComment;
    }


    public function differentRequestChange($oldRequest, $newRequest, $data, $requestChange)
    {
        if ($oldRequest->name != $newRequest->name) {
            $change = 'name';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }

        if ($oldRequest->content != $newRequest->content) {
            $change = 'content';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }

        if ($oldRequest->category_id != $newRequest->category_id) {
            $change = 'category';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }

        if ($oldRequest->assignee != $newRequest->assignee) {
            $change = 'assigneeTo';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }

        if ($oldRequest->level != $newRequest->level) {
            $change = 'level';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }

        if ($oldRequest->status_request != $newRequest->status_request) {
            $change = 'status_request';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }

        if ($oldRequest->due_date != $newRequest->due_date) {
            $change = 'due_date';
            $params[] = $this->renderParams($requestChange, $data, $oldRequest, $newRequest, $change);
        }
        return $params;
    }

    /**
     * @param int $id
     * @return bool|mixed
     */
    public function destroy($id)
    {
        $request = $this->requestRepository->issetRequest($id)->first();
        if (!$request) {
            return [
                'code' => 400,
                'message' => trans('messages.requestEmpty'),
            ];
        } else {
            $Auth_id = Auth::user()->id;
            $userId = $request->user_id;
            $historyRequestIds = $this->requestChangeHistoryRepository->detailRequest($id)->pluck('id');
            $status = $request->status_request;
            $nameRequest = $request->name;
            $paramshistory = [
                'content_change' => $nameRequest,
                'type' => "delete",
                'request_id' => $id,
                'user_id' => Auth::user()->id
            ];
            if ($Auth_id == $userId && $status == Request::STATUS_REQUEST_OPEN) {
                return [
                    'code' => 200,
                    'message' => trans('messages.deleteSuccess'),
                    'data' => [
                        'request' => $this->requestRepository->find($id)->destroy($id),
                        'request_history' => $this->requestChangeHistoryRepository
                            ->destroyMulti($historyRequestIds),
                        'create_request_history' => $this->createHistory($paramshistory)
                    ]
                ];
            }
            return [
                'code' => 400,
                'message' => trans('messages.deletePermission'),
            ];
        }
    }

    public function filterRequest($params)
    {
        $data = [
            'per_page' => 10,
        ];
        $params = array_merge($data, $params);
        $requests = $this->requestRepository->filterRequest($params)->paginate($params['per_page']);
        if ($requests) {
            return [
                'code' => 200,
                'total_record' => $requests->count(),
                'data' => $requests
            ];
        }
    }

    public function createHistory($dataHistory)
    {
        if (!$this->requestChangeHistoryRepository->store($dataHistory)) {
            throw new Exception();
        } else {
            return true;
        }
    }

    public function createHistoryDeatil($dataHistory)
    {
        if (!$this->requestChangeDetailRepository->insertMulti($dataHistory)) {
            throw new Exception();
        } else {
            return true;
        }
    }

    public function renderParams($requestChange, $data, $oldRequest, $newRequest, $change)
    {
        $params = [
            'request_change_id' => $requestChange->id,
            'field' => "{$change}",
        ];
        if ($change == 'category' || $change == 'assigneeTo') {
            $params['old_value'] = $oldRequest->$change->name;
            $params['new_value'] = $newRequest->$change->name;
        } else {
            $params['old_value'] = $oldRequest->{$change};
            $params['new_value'] = $newRequest->{$change};
        }
        return $params;
    }

    public function dueDate()
    {
        $requests = $this->requestRepository->dueDate();
        $dataToSend = [];
        foreach ($requests as $request) {
            if (!isset($dataToSend[$request->assigneeTo->email])) {
                $dataToSend[$request->assigneeTo->email] = [];
            }
            $dataToSend[$request->assigneeTo->email][] = $request->toArray();
        }

        foreach ($dataToSend as $emailToSend => $detailData) {
            $requestsAdmin = [];
            foreach ($detailData as $key => $request) {
                $requestsAdmin[] = $request;
                $urlDetailRequest = config('app.requestUrl') . 'requestDetail/' . $request['id'];
                array_push($requestsAdmin[$key], $urlDetailRequest);
            }
            
            $mail = [
                'title' => 'Xử lý request',
                'authorName' => 'Admin HBLAB',
                'email' => $emailToSend,
                'requests' => $requestsAdmin,
            ];
            try {
                Mail::send(new SendMailDueDate($mail));
            } catch (\Throwable $th) {
                return ([
                    'code' => 400,
                    'message' => trans('messages.dueDateSendMailFailt'),
                ]);
            }
        }
    }
}

<?php

namespace App\Services\Api;

use App\Contracts\Repositories\CommentRepositoryInterface;
use App\Contracts\Services\Api\CommentServiceInterface;
use App\Contracts\Services\Api\RequestChangeHistoryServiceInterface;
use App\Contracts\Repositories\RequestRepositoryInterface;
use App\Contracts\Services\Api\RequestServiceInterface;
use App\Contracts\Repositories\RequestChangeHistoryRepositoryInterface;
use App\Models\RequestChangeHistory;
use App\Models\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\AbstractService;
use App\Models\Role;
use App\Mail\SendMailComment;
use Illuminate\Support\Facades\Mail;

class CommentService extends AbstractService implements CommentServiceInterface
{
    /**
     * @var CommentRepositoryInterface
     */
    protected $commentRepository;

    /**
     * CategoryService constructor.
     * @param CommentRepositoryInterface $commentRepository
     */
    public function __construct(
        CommentRepositoryInterface $commentRepository,
        RequestChangeHistoryRepositoryInterface $requestChangeHistoryRepository,
        RequestRepositoryInterface $requestRepository
    ) {
        $this->commentRepository = $commentRepository;
        $this->requestChangeHistoryRepository = $requestChangeHistoryRepository;
        $this->requestRepository = $requestRepository;
    }

    /**
     * @param $params
     * @return array
     */
    public function index($params, $id)
    {
        $data = [
            'per_page' => '10',
        ];
        $params = array_merge($data, $params);
        return $this->commentRepository
            ->getColumns(['*'], ['request:id,name,content,assignee,status_request', 'user:id,name'])
            ->where('request_id', $id)->paginate($params['per_page']);
    }

    /**
     * @param $params
     * @return array
     */
    public function store($params)
    {
        $nameAuthor = Auth::user()->name;
        $roleAuthor = Auth::user()->role_id;
        $deparmentAuthor = Auth::user()->role_id;
        $params['user_id'] = Auth::user()->id;
        $params['type'] = 'comment';
        $comment = $this->requestChangeHistoryRepository->store($params);
        $commentInfo = $this->requestChangeHistoryRepository->find($comment->id);
        $comment['user_name'] = $nameAuthor;
        
        $mail = [
            'title' => trans('messages.requestTitleComment') . ' ' . date("d/m/y"),
            'content' => $comment->content_change,
            'nameAuthor' => $nameAuthor,
            'roleAuthor' => $roleAuthor,
            'deparmentAuthor' => $deparmentAuthor,
            'urlDetailRequest' => config('app.requestUrl') . 'requestDetail/' . $comment->request->id,
            'email' => [
                $comment->request->user->email,
                $comment->request->assigneeTo->email,
            ]
        ];

        try {
            Mail::send(new SendMailComment($mail));
            return [
                'code' => 200,
                'status' => 'success',
                'message' => trans('messages.commentSuccess'),
                'content' => $commentInfo,
                'user' => [
                    'id' => $params['user_id'],
                    'name' => $comment->user->name
                ]
            ];
        } catch (\Throwable $th) {
            return [
                'code' => 200,
                'message' => trans('messages.commentSuccessSendMailFailt'),
                'code' => 200,
                'status' => 'success',
                'content' => $commentInfo,
                'user' => [
                    'id' => $params['user_id'],
                    'name' => $comment->user->name
                ]
            ];
        }
        return $comment;
    }
}

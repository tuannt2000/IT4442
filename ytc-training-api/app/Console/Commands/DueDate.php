<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Request;
use App\Notifications\SendMailDueDate;
use App\Services\Api\RequestService;
use App\Contracts\Services\Api\RequestServiceInterface;

class DueDate extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'request:sendMailDueDate';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gửi email cho admin khi due-date sắp hết hạn';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(RequestServiceInterface $requestService)
    {
        $this->requestService = $requestService;
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        return $this->requestService->dueDate();
    }
}

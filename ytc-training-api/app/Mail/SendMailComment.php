<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendmailComment extends Mailable
{
    use Queueable, SerializesModels;

    public $mail;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($mail)
    {
        $this->mail = $mail;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $email = config('app.urlDetailRequest');
        return $this->from($email, $this->mail['nameAuthor'] . ' via Request Gate_Team 1')
                    ->view('email.requests.comment')
                    ->subject($this->mail['title'])
                    ->to($this->mail['email']);
    }
}

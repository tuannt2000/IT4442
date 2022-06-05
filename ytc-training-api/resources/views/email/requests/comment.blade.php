<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            min-width: 100% !important;
        }

        .content {
            width: 100%;
            max-width: 600px;
        }
    </style>
</head>

<body>
    <a href="{{$mail['urlDetailRequest']}}">Detail Request</a> <br> <br>
    <div>
        <?php
        if ($mail['roleAuthor'] == 3) {
            echo "Manager";
        }
        if ($mail['roleAuthor'] == 2) {
            echo "User";
        }
        if ($mail['roleAuthor'] == 1) {
            echo "Admin";
        }
        ?>
        của bộ phận
        <?php
        if ($mail['deparmentAuthor'] == 3) {
            echo "PHP 2";
        }
        if ($mail['deparmentAuthor'] == 2) {
            echo "PHP 1";
        }
        if ($mail['deparmentAuthor'] == 1) {
            echo "PHP";
        }
        if ($mail['deparmentAuthor'] == 4) {
            echo "JAVA";
        }
        ?>
        <br>
        {{$mail['nameAuthor']}} đã comment vào request của bạn!
        <br>
        Nội dung comment:
        <br> <br>
        <div style="box-shadow: rgba(0, 0, 0, 0.4) 0px 0px 10px; box-sizing: inherit; margin-bottom: 10px; padding: 20px; box-sizing: inherit; line-height: 1.6em; padding: 15px;">
        <span style="color: #222222;">» {{$mail['content']}}</span><br />
        </div>
    </div>
</body>
</html>
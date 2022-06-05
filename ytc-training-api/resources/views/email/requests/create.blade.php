<!DOCTYPE html>
<html>
  <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        <style type="text/css">
        body {margin: 0; padding: 0; min-width: 100%!important;}
        .content {width: 100%; max-width: 600px;}  
        table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            color : black;
            padding : 10px;
            }
        </style>
    </head>
    <body>
<div>
    <h4>Thông tin request mới được tạo sẽ được gửi đến Gmail của người tạo và người được assingee</h4>
    <a href="{{$mail['urlDetailRequest']}}">Detail Request</a> <br> <br>
    <table>
        <tr>
            <td>Name Request: </td>
            <td>{{$mail['requestName']}}</td>
        </tr>
        <tr>
            <td>Content Request: </td>
            <td>{{$mail['content']}}</td>
        </tr>
        <tr>
            <td>Author Request: </td>
            <td>{{$mail['authorName']}}</td>
        </tr>
        <tr>
            <td>Email Author Request: </td>
            <td>{{$mail['authorEmail']}}</td>
        </tr>
        <tr>
            <td>Assignee Request: </td>
            <td>{{$mail['assigneeName']}}</td>
        </tr>
        <tr>
            <td>Email Assignee Request: </td>
            <td>{{$mail['assigneeEmail']}}</td>
        </tr>
        <tr>
            <td>Status Request: </td>
            <td>
                <?php
                if($mail['statusRequest'] == 3) {
                    echo "Open";
                }
                if($mail['statusRequest'] == 2) {
                    echo "In Progress";
                }
                if($mail['statusRequest'] == 1) {
                    echo "Open";
                }
                ?>
            </td>
        </tr>
        <tr>
            <td>Due date: </td>
            <td>{{$mail['dueDate']}}</td>
        </tr>
        <tr>
            <td>Level Request: </td>
            <td>
            <?php
                if($mail['level'] == 3 ) {
                    echo "Level Low";
                }
                if($mail['level'] == 2) {
                    echo "Level Medium";
                }
                if($mail['level'] == 1) {
                    echo "Level High";
                }
                ?>

            </td>
        </tr>
    </table>
</div>
</body>
</html>

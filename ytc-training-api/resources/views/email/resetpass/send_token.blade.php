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
  <h3>Yêu cầu resetPassword của bạn đã được gửi , nếu không phải bạn thì bạn không cần làm gì</h3>
  <h4>Link này chỉ có hiệu lực trong 60 phút từ khi bạn nhận được mail này<h4>
  <a href="{{$mail['urlResetPass']}}?token={{$mail['token']}}">Chuyển đến trang ResetPassWord</a>
</body>

</html>
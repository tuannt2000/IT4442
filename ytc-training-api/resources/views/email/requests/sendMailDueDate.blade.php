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
		@foreach($mail['requests'] as $mail1)
			<h3>Thông báo xử lý request sắp hết hạn cho Admin:</h3>
			<a href=" {{ $mail1['0']}}">Detail Request</a> <br> <br>
			<table>
				<tr>
					<td>Name</td>
					<td>{{ $mail1['name'] }}</td>
				</tr>
				<tr>
					<td>Content</td>
					<td>{{ $mail1['content'] }}</td>
				</tr>
				<tr>
					<td>DueDate</td>
					<td>{{ $mail1['due_date'] }}</td>
				</tr>
			</table>
		@endforeach
	</body>
</html>
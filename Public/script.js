$(document).ready(function () {

	getEmployees();

	$("#newEmpBtn").on("click", function (e) {
		$("#newForm").toggle();
	});

	function getEmployees() {
		$('#employeeBody').html('');
		$.ajax({
			url: 'http://localhost:3000/employees',
			method: 'GET',
			dataType: 'json',
			data: {
				test: 'test data'
			},
			success: function (data) {
				$(data).each(function (i, employee) {
					$('#employeeBody').append($("<tr>")
						.append($("<td>").append(employee.id))
						.append($("<td>").append(employee.name))
						.append($("<td>").append(employee.subject))
						.append($("<td>").append(employee.time_in))
						.append($("<td>").append(employee.time_out))
						.append($("<td>").append(`
											<i class = "far fa-edit editEmp" data-empid="` + employee.id + `"></i>
											<i class = "fas fa-trash deleteEmp" data-empid="` + employee.id + `"></i>
											`)));
				});
			},
			error: function(){
				alert('error loading employees')
			}
		});
    }	
    function postEmployee(data) {
		$.ajax({
			url: 'http://localhost:3000/employees',
			method: 'POST',
			dataType: 'json',
			data: data,
			success: function (data) {
				console.log(data);
				//the function below is called to refresh the table
				getEmployees();
			},
			error:function(){
				alert('error adding employee')
			}

		});
	}

});

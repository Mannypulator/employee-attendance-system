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
                loadButtons();
			},
			error: function(){
				alert('error loading employees')
			}
		});
	}
	//function searchEmployee() {
		$("#search-btn").unbind().click(function (e) {
			// $('#employeeBody').html('');
			var searchEmployee= $("#search-box").val();
			console.log(searchEmployee);
			
				$.ajax({
					url: 'http://localhost:3000/employees/?name=' + searchEmployee,
					method: 'GET',
					dataType: 'json',
					success: function (data) {
						$(data).each(function (i, employee) {
							console.log(employee.time_in);
							$('#employeeBody').html(`<tr>
							<td>${employee.id}</td>
							<td>${employee.name}</td>
							<td>${employee.subject}</td>
							<td>${employee.time_in}</td>
							<td>${employee.time_out}</td>
							<td><i class = "far fa-edit editEmp" data-empid="  ${employee.id}  "></i>
							<i class = "fas fa-trash deleteEmp" data-empid="  ${employee.id}  "></i></td>
							</tr>`)
						});
						
					},
					error: function(){
						alert ('error getting the employee')
					}
				});
			
		});
	// }
    function getOneEmployee(num) {
		$.ajax({
			url: 'http://localhost:3000/employees/' + num,
			method: 'GET',
			dataType: 'json',
			success: function (data) {
				$($("#updateForm")[0].updateEmpId).val(data.id);
				$($("#updateForm")[0].updateName).val(data.name);
				$($("#updateForm")[0].updateSubject).val(data.subject);
				$($("#updateForm")[0].updateTimeIn).val(data.time_in);
				$($("#updateForm")[0].updateTimeOut).val(data.time_out);
				$("#updateForm").show();
			},
			error: function(){
				alert ('error getting one employee')
			}
        });
    }	
    $("#submitEmployee").on("click", function (e) {
		let data = {
			id: $($("#newForm")[0].empId).val(),
			name: $($("#newForm")[0].name).val(),
			subject: $($("#newForm")[0].subject).val(),
			time_in: $($("#newForm")[0].timeIn).val(),
			time_out: $($("#newForm")[0].timeOut).val()

		}

		postEmployee(data);
		$("#newForm").trigger("reset");
		$("#newForm").toggle();
		e.preventDefault();
	});
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
    function loadButtons() {
		$(".editEmp").click(function (e) {
			getOneEmployee($($(this)[0]).data("empid"));
			e.preventDefault();
		});
		$(".deleteEmp").click(function (e) {
			deleteEmployee($($(this)[0]).data("empid"));
			e.preventDefault();
		});
	}
    function putEmployee(num, data) {
        num=($("#updateEmpId").val())
            $.ajax({
                url: 'http://localhost:3000/employees/'+num,
                method: 'PUT',
                dataType: 'json',
                data: data,
                success: function (data) {
                    console.log(data);
                    getEmployees();
                },
                error: function() {
                    alert('error updating employee');
                }
            });
    }
    $("#updateEmployee").on("click", function (e) {
		let data = {
			id: $($("#updateForm")[0].updateEmpId).val(),
			name: $($("#updateForm")[0].updateName).val(),
			subject: $($("#updateForm")[0].updateSubject).val(),
			time_in: $($("#updateForm")[0].updateTimeIn).val(),
			time_out: $($("#updateForm")[0].updateTimeOut).val()

		}

		putEmployee($($("#updateForm")[0].empId).val(), data);
		$("#updateForm").trigger("reset");
		$("#updateForm").toggle();
		e.preventDefault();
    });
    function deleteEmployee(num) {
		$.ajax({
			url: 'http://localhost:3000/employees/' + num,
			method: 'DELETE',
			dataType: 'json',
			success: function (data) {
				alert('employee deleted successfully!')
				console.log(data);
				getEmployees();
			},
			error:function(){
				alert('error deleting employee');
			}

		});
	}


});

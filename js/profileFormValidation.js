
$(document).ready(function() {
    
     function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    $('#captchaOperation').html([randomNumber(1, 100), '+', randomNumber(1, 200), '='].join(' '));
    
    function adjustIframeHeight() {
        var $body   = $('body'),
            $iframe = $body.data('iframe.fv');
        if ($iframe) {
            // Adjust the height of iframe
            $iframe.height($body.height());
        }
    }


    // IMPORTANT: You must call .steps() before calling .formValidation()
    $('#profileForm')
        .steps({
            headerTag: 'h2',
            bodyTag: 'section',
            onStepChanged: function(e, currentIndex, priorIndex) {
                // You don't need to care about it
                // It is for the specific demo
                adjustIframeHeight();
            },
            // Triggered when clicking the Previous/Next buttons
            onStepChanging: function(e, currentIndex, newIndex) {
                var fv         = $('#profileForm').data('formValidation'), // FormValidation instance
                    // The current step container
                    $container = $('#profileForm').find('section[data-step="' + currentIndex +'"]');
                   // If user click on "Previous" button, we just normally let he/she goes
            if (newIndex < currentIndex) {
                return true;
            }
                // Validate the container
                fv.validateContainer($container);

                var isValidStep = fv.isValidContainer($container);
                if (isValidStep === false || isValidStep === null) {
                    // Do not jump to the next step
                    return false;
                }
                
               

                return true;
            },
            // Triggered when clicking the Finish button
            onFinishing: function(e, currentIndex) {
                var fv         = $('#profileForm').data('formValidation'),
                    $container = $('#profileForm').find('section[data-step="' + currentIndex +'"]');

                // Validate the last step container
                fv.validateContainer($container);

                var isValidStep = fv.isValidContainer($container);
                if (isValidStep === false || isValidStep === null) {
                    return false;
                }

                return true;
            },
            onFinished: function(e, currentIndex) {
                 var url = "employee.php"; // the script where you handle the form input.

    $.ajax({
           type: "POST",
           url: url,
           data: $("#profileForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
                 $('b.returnName').text(data);
            //   alert(data); // show response from the php script.
           }
         });

                // Uncomment the following line to submit the form using the defaultSubmit() method
               // $('#profileForm').formValidation('defaultSubmit');
             
                // For testing purpose
                $('#welcomeModal').modal();
                
                
                // Clear the form
                $("#profileForm")[0].reset();
                
                /**************************************************
                 *  Send Jquery steps to 1 after submitting the form 
                 * ***********************************************/
                $.fn.steps.setStep = function (step)
{
  var currentIndex = $(this).steps('getCurrentIndex');
  for(var i = 0; i < Math.abs(step - currentIndex); i++){
    if(step > currentIndex) {
      $(this).steps('next');
    }
    else{
      $(this).steps('previous');
    }
  } 
};
// Call jquery setStep function inorder to set step 
$("#profileForm").steps("setStep", 0); //based on 0 (set the index)
            }
        })
        .formValidation({
            framework: 'bootstrap',
             container: 'popover',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            // This option will not ignore invisible fields which belong to inactive panels
            excluded: ':disabled',
            fields: {
                /*
                username: {
                     row: '.col-xs-6',
                    validators: {
                        notEmpty: {
                            message: 'The username is required'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        },
                         different: {
                        field: 'password',
                        message: 'The username and password cannot be the same as each other'
                    }
                    }
                },
                email: {
                     row: '.col-xs-6',
                    validators: {
                        notEmpty: {
                            message: 'The email address is required'
                        },
                        emailAddress: {
                            message: 'The input is not a valid email address'
                        }
                    }
                },
                password: {
                     row: '.col-xs-6',
                    validators: {
                        notEmpty: {
                            message: 'The password is required'
                        },
                         different: {
                        field: 'username',
                        message: 'The password cannot be the same as username'
                    }
                    }
                },
                confirmPassword: {
                     row: '.col-xs-6',
                    validators: {
                        notEmpty: {
                            message: 'The confirm password is required'
                        },
                        identical: {
                            field: 'password',
                            message: 'The confirm password must be the same as original one'
                        }
                    }
                },
                firstName: {
                    row: '.col-xs-3',
                    validators: {
                        notEmpty: {
                            message: 'The first name is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z\s]+$/,
                            message: 'The first name can only consist of alphabetical and space'
                        }
                    }
                },
                middleName: {
                    row: '.col-xs-3',
                    validators: {
                        regexp: {
                            regexp: /^[a-zA-Z\s]+$/,
                            message: 'The middle name can only consist of alphabetical and space'
                        }
                    }
                },
                lastName: {
                    row: '.col-xs-3',
                    validators: {
                        notEmpty: {
                            message: 'The last name is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z\s]+$/,
                            message: 'The last name can only consist of alphabetical and space'
                        }
                    }
                },
               streetAddress: {
                      row: '.col-xs-6',
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your stree Address'
                    }
                }
            },
            cityName: {
                  row: '.col-xs-3',
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                        message: 'Please supply your city'
                    }
                }
            },
            stateName: {
                  row: '.col-xs-3',
               validators: {
                    notEmpty: {
                        message: 'The state is required and can\'t be empty'
                    }
                }
            },
            zipCode: {
                 row: '.col-xs-3',
                validators: {
                    stringLength: {
                        min: 4,
                    },
                    notEmpty: {
                            message: 'Please input your valid zipcode'
                        },
                    zipCode: {
                        country: 'US',
                        message: 'The input is not a valid US zip code'
                    }
                }
            },
             gender: {
                  row: '.col-xs-6',
                    validators: {
                        notEmpty: {
                            message: 'The gender is required'
                        }
                    }
                },
                dob: {
                      row: '.col-xs-3',
                    validators: {
                        notEmpty: {
                            message: 'The birthday is required'
                        },
                        date: {
                            format: 'DD/MM/YYYY',
                            message: 'The birthday is not valid'
                        }
                    }
                },
                 maritalStatus: {
                       row: '.col-xs-3',
                    validators: {
                        notEmpty: {
                            message: 'The maritalStatus is required'
                        }
                    }
                },
                ssn: {
                     row: '.col-xs-3',
                    validators: {
                        
                        notEmpty: {
                            message: 'The ssn is required'
                        },
                        stringLength: {
                            min: 11,
                            max: 11,
                            message: 'The ssn should be in formate xxx-xx-xxxx'
                        }
                    }
                },
                 phoneNumberUS: {
                      row: '.col-xs-3',
                validators: {
                     notEmpty: {
                            message: 'The US phone number is required'
                        },
                    phone: {
                        message: 'The input is not a valid US phone number',
                        country: 'US'
                    }
                }
            },
            jobTitle: {
                    row: '.col-xs-6',
                    validators: {
                        notEmpty: {
                            message: 'The job-title is required'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z\s]+$/,
                            message: 'The job title can only consist of alphabetical and space'
                        }
                    }
                },
                employeeId: {
                     row: '.col-xs-6',
                validators: {
                    notEmpty: {
                            message: 'The job-title is required'
                        },
                    integer: {
                        message: 'The value is not an integer'
                    },
                    stringLength: {
                            min: 5,
                            max: 5,
                            message: 'Employee Id should be 5 digit number'
                        }
                }
                },
                startDate: {
                      row: '.col-xs-3',
                    validators: {
                        notEmpty: {
                            message: 'The birthday is required'
                        },
                        date: {
                            format: 'DD/MM/YYYY',
                            message: 'The birthday is not valid'
                        }
                    }
                },
                salaryRate: {
                    validators: {
                        numeric: {
                            message: 'The value is not a number',
                            // The default separators
                            thousandsSeparator: '',
                            decimalSeparator: '.'
                        }
                    }
                },
                captcha: {
                     row: '.col-xs-6',
                validators: {
                    callback: {
                        message: 'Wrong answer',
                        callback: function(value, validator, $field) {
                            var items = $('#captchaOperation').html().split(' '), sum = parseInt(items[0]) + parseInt(items[2]);
                            return value == sum;
                        }
                    }
                }
            },
            agree: {
                 row: '.col-xs-6',
                validators: {
                    notEmpty: {
                        message: 'You must agree with the terms and conditions'
                    }
                }
            }*/
            }
        });
        
});

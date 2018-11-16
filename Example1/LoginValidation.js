angular.module("myAPP", ['ui.router'])
    .controller("homeController", ["$scope", "$state", function (scope, state) {
        scope.enteredEmail = ""
        scope.enteredPassword = ""
        scope.studentDetails = []
        scope.validated = false
        scope.submitted = false
        scope.home = true
        console.log("angular is loaded")

        scope.Validate = function () {
            scope.submitted = true
            scope.home = false
            console.log(scope.studentDetails)
            console.log("Entered Email: " + scope.enteredEmail)
            console.log("Entered Password: " + scope.enteredPassword)
           /* state.go("Login", {
                 enteredEmail: scope.enteredEmail,
                 enteredPassword: scope.enteredPassword
             })
             */
            
            for (var i = 0; i < scope.studentDetails.length; i++) {
                if (scope.studentDetails[i].Email == scope.enteredEmail) {
                    if (scope.studentDetails[i].password == scope.enteredPassword) {
                        scope.validated = true
                        console.log("Validated")
                        break
                    }

                }
            }
        }
    }])
    .config(["$stateProvider", "$urlRouterProvider", function (stateProvider, urlRouterProvider) {
        stateProvider
            .state("Home", {
                url: '',
                /*  views: {
                      'uv1': {
                          templateUrl: 'toppanel.html'
                      },
                      'uv2': {
                          templateUrl: 'About.html'
                      }
                  }*/
                templateUrl: 'About.html',

            })
            .state("Department", {
                url: '/Department',
                /*   views: {
                       'uv1': {
                           templateUrl: 'toppanel.html'
                       },
                       'uv2': {
                           templateUrl: 'Department.html'
                       }
            }*/
                templateUrl: 'Department.html'

            })
            .state("ImportantDates", {
                url: '/ImportantDates',
              /*  views: {
                    'uv1': {
                        templateUrl: 'toppanel.html'
                    },
                    'uv2': {
                        templateUrl: 'ImportantDates.html'
                    }
                }*/
                templateUrl: 'ImportantDates.html'
            })
             .state("Login", {
                 url: '/Login/:enteredEmail/:enteredPassword',
                 templateUrl:'About.html',
                 controller: function ($rootScope,$scope,$stateParams) {
                     $scope.enteredEmail = $stateParams.enteredEmail;
                     $scope.enteredPassword = $stateParams.enteredPassword;
                     console.log($scope.studentDetails);
                     console.log($scope.enteredEmail);
                     console.log($scope.enteredPassword);
                     for (var i = 0; i < $scope.studentDetails.length; i++) {
                         if ($scope.studentDetails[i].Email == $scope.enteredEmail) {
                             if ($scope.studentDetails[i].password == $scope.enteredPassword) {
                                 $rootScope.validated = true
                                 console.log("Validated")
                                 $rootScope.enteredEmail='';
                                 $rootScope.enteredPassword='';
                                 break
                             }
         
                         }
                     }
         
                 }
             })
             .state("Attendence",{
                 url:'/Attendence',
                 templateUrl:'Attendence.html'
             })
            
            .state("Signup", {
                url: '/Signup',
            /*    views: {
                    'uv1': {
                        templateUrl: 'toppanel.html'
                    },
                    'uv2': 'Signup.html'
                },*/
                templateUrl: 'Signup.html',
                controller: function ($scope) {
                     $scope.Language = ["English", "Hindi", "Kannada", "Marathi", "Telugu"]
                     $scope.home = false
                     $scope.studentEntry = {
                         Name: "",
                         Email: "",
                         Gender: "",
                         Language: "",
                         password: "",
                         confirmpass: "",
                         passYear: "",
                         totalAggregate: ""
                     }
                     $scope.passmatch = true
                     $scope.CreateEntry = function () {
                         if ($scope.studentEntry.password != $scope.studentEntry.confirmpass) {
                             $scope.passmatch = false
                         }
                         else {
                             $scope.passmatch = true
                         }
                         if ($scope.passmatch) {
                             $scope.studentDetails.push($scope.studentEntry)
                             $scope.studentEntry = {}
                         }
        
                         console.log($scope.studentDetails)
                     }
                 }
            })


    }])
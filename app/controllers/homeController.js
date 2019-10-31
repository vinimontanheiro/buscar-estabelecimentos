'use strict';

angular.module('HomeController', [])
    .controller('HomeController', ['ApiService', 'MessageService', 'Util', '$scope','$q','usSpinnerService','ngDialog',
        function HomeController(ApiService, MessageService, Util, $scope,$q,usSpinnerService,ngDialog) {

            $scope.slider = document.getElementById('slider1');
            $scope.slider1Value = document.getElementById('slider1-span');
            var service, marker, location, map = false,markersEnderecos=[],markersEstabelecimentos=[];
            $scope.isMapOpen = false;
            $scope.detail = {};
            $scope.isOpen = false;
            $scope.limparCoords = false;

            $scope.local = {
                tipo: 'estabelecimento',
                regiao: 'todas',
                descricao: '',
                isCidade: false,
                raio: 50000,
                isCoords: false,
                coords: {
                    latitude: 0,
                    longitude: 0
                },
                doc: {
                    isXml: false,
                    isJson: true
                },
                url: '',
                lista: {
                    estabelecimentos: [],
                    enderecos: []
                }
            };

            noUiSlider.create($scope.slider, {
                start: 50000,

                animate: true,
                range: {
                    min: 200,
                    max: 50000
                }
            });

            $scope.iniciar = function () {
                $scope.getLocation();

                $('body').dblclick(function () {
                    if($scope.isOpen){
                        Util.fn.animate($('#options'), {
                            right: '-5000px'
                        }, 300);
                        $scope.isOpen = false;
                    }
                });

                $(document).keyup(function(e) {
                    if (e.keyCode === 13) {
                        $scope.onSearch();
                    } 
                    if (e.keyCode === 27) {
                        if($scope.isOpen){
                            Util.fn.animate($('#options'), {
                                right: '-5000px'
                            }, 300);
                            $scope.isOpen = false;
                            $scope.onSearch();
                        }
                    };   
                  });

                $(window).scroll(function() {
                    if ( $(window).scrollTop() > 300 ) {
                        $('a.back-to-top').fadeIn('slow');
                    } else {
                        $('a.back-to-top').fadeOut('slow');
                    }
                });


                $('a.back-to-top').click(function() {
                    $('html, body').animate({
                        scrollTop: 0
                    }, 700);
                    return false;
                });
            };

            $scope.onOptions = function () {
                if ($scope.isOpen) {
                    Util.fn.animate($('#options'), {
                        right: '-5000px'
                    }, 500);
                } else {
                    Util.fn.animate($('#options'), {
                        right: '50px'
                    }, 500);
                }
                $scope.isOpen = !$scope.isOpen;
            };

            $scope.OnMap = function () {
                if ($scope.isMapOpen) {
                    Util.fn.animate($('#map'), {
                        opacity: '0'
                    }, 600);
                } else {
                    Util.fn.animate($('#map'), {
                        opacity: '1'
                    }, 600);

                    if($scope.local.lista.estabelecimentos.length >= 1){
                        $scope.createMarkerEstabelecimento();
                    }

                    if($scope.local.lista.enderecos.length >= 1){
                        $scope.createMarkerEndereco();
                    }

                }

                $scope.isMapOpen = !$scope.isMapOpen;
            };


            $scope.slider.noUiSlider.on('update', function (values, handle) {
                $scope.slider1Value.innerHTML = values[handle];
                $scope.local.raio = values[handle];
            });

            function setLockedValues() {
                var lockedValues = [
                    Number($scope.slider.noUiSlider.get())
                ];
            }

            $scope.slider.noUiSlider.on('change', setLockedValues);

            $scope.slider.noUiSlider.on('slide', function (values, handle) {
                crossUpdate(values[handle], $scope.slider);
            });

            function crossUpdate(value, slider) {
                value -= lockedValues[b] - lockedValues[a];
                slider.noUiSlider.set(value);
            }


            $scope.$watch('local.descricao', function (text) {
                $('.search').attr("placeholder", text);
            });


            $scope.atualizarParametros = function atualizarParametros(text) {
                if (text == 'endereco') {
                    $scope.local.descricao = 'Rua/Avenida, número - bairro, cidade - estado';
                } else {
                    $scope.local.descricao = "Informe o nome do " + text;
                }
            };


            $scope.$watch('local.tipo', function (text) {
                $scope.atualizarParametros(text);
            });

            $scope.$watch('local.regiao', function (text) {
                if (text == 'coords') {
                    $scope.local.isCoords = true;
                    $scope.local.coords.latitude = $scope.limparCoords ? 0 : $scope.local.coords.latitude || $('#lat').val();
                    $scope.local.coords.longitude = $scope.limparCoords ? 0 : $scope.local.coords.longitude || $('#long').val();
                    $scope.limparCoords = false;
                } else {
                    if (text == 'cidade') {
                        $scope.local.isCidade = true;
                        $scope.local.isCoords = false;
                        $('#inputCidade').focus();
                    } else {

                        if (text == 'atual') {
                            $scope.limparCoords = true;
                            $scope.local.isCoords = true;
                            $scope.local.isCidade = false;
                            $scope.getLocation();

                        } else {
                            $scope.local.isCoords = false;
                            $scope.local.coords.latitude = "";
                            $scope.local.coords.longitude = "";
                            $scope.local.isCidade = false;
                        }
                    }
                }

            });

            $scope.startSpin = function(){
                $('#fade-wrapper').fadeIn();
                usSpinnerService.spin('spinner-1');
            };

            $scope.stopSpin = function(){
                $('#fade-wrapper').fadeOut(function () {
                    usSpinnerService.stop('spinner-1');
                });
            };

            $scope.onSearch = function onSearch() {
                $scope.local.termos = $scope.local.termos || $('.search').val();
                if(!$scope.local.termos){
                    $('.search').focus();
                    MessageService.addInfo("Informe o termo que deseja procurar");
                    return;
                }
                $scope.startSpin();

                if($scope.isMapOpen){
                    $scope.isMapOpen = false;
                    $scope.OnMap();
                }

                if ($scope.local.isCidade) {
                    $scope.local.cidade = $scope.local.cidade || $('#inputCidade').val();
                    if (Util.fn.isEmpty($scope.local, ['cidade'])) {
                        MessageService.addError("Informe o nome da cidade");
                        return false;
                    }

                    $scope.local.cidade = $scope.local.cidade || $('#inputCidade').val();
                    const query = `https://maps.google.com/maps/api/geocode/json?address=${$scope.local.cidade}&key=AIzaSyCkns5Bc0DibPWAOgPMv6JEwzW4QV6pahg`;
                    ApiService.query(query)
                        .then(function (coordenadas) {
                            if (coordenadas.data && coordenadas.status == 200){
                                if(coordenadas.data.results[0].geometry){
                                    $scope.local.coords.latitude = coordenadas.data.results[0].geometry.location.lat;
                                    $scope.local.coords.longitude = coordenadas.data.results[0].geometry.location.lng;
                                    $scope.local.tipo == "endereco" ? $scope.getByAddress() : $scope.getByEstabelecimento();
                                }else {
                                    MessageService.addError("Não foi possível localizar a cidade");
                                }
                            } else {
                                MessageService.addError("Não foi possível localizar a cidade");
                            }
                        });
                } else {
                    if ($scope.local.regiao == 'coords' || $scope.local.regiao == 'atual') {

                        if (Util.fn.isEmpty($scope.local.coords, ['latitude', 'longitude'])) {
                            return MessageService.addError("As informações de latitude ou longitude não foram informadas!");
                        }

                    }
                    $scope.local.tipo == "endereco" ? $scope.getByAddress() : $scope.getByEstabelecimento();
                }

            };
            $scope.getByAddress = function getByAddress() {
                $scope.local.lista.enderecos = [];
                $scope.local.lista.estabelecimentos = [];
                const query = `https://maps.google.com/maps/api/geocode/json?address=${$scope.local.termos}&key=AIzaSyCkns5Bc0DibPWAOgPMv6JEwzW4QV6pahg`;
                ApiService.query()
                    .then(function (coordenadas,pagination) {

                        map = new google.maps.Map(document.getElementById('map'), {
                            center: location,
                            zoom: 10,
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        });

                        if (coordenadas.data && coordenadas.status == 200){
                            for (var i = 0; i < coordenadas.data.results.length; i++) {
                                    $scope.local.lista.enderecos.push(coordenadas.data.results[i]);
                            }

                            if(pagination){
                                if(pagination.hasNextPage){
                                    pagination.nextPage();
                                }else{
                                    $scope.stopSpin();
                                }
                            }else{
                                $scope.stopSpin();
                            }
                        } else {
                            $scope.stopSpin();
                            MessageService.addError("Nenhum resultado encontrado!");
                        }

                    });
            };

            $scope.getLocation = function getLocation(callback) {

                navigator.geolocation.getCurrentPosition(function (position) {

                    var marker = {};

                    $scope.local.coords.latitude = position.coords.latitude;
                    $scope.local.coords.longitude = position.coords.longitude;

                    location = new google.maps.LatLng($scope.local.coords.latitude, $scope.local.coords.longitude);

                    map = new google.maps.Map(document.getElementById('map'), {
                        center: location,
                        zoom: 10,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                    marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        draggable: true,
                        title: "Você",
                        animate: google.maps.Animation.DROP
                    });

                    if(typeof(callback) == 'function'){
                        callback();
                    }

                },function (err) {
                    console.log(err);
                    MessageService.addError("Você precisa permitir usar sua localização!");
                });

            };

            $scope.getByEstabelecimento = function () {

                location = new google.maps.LatLng($scope.local.coords.latitude, $scope.local.coords.longitude);

                var request = {
                    location: location,
                    radius: parseInt($scope.local.raio),
                    types: ['establishment'],
                    keyword : $scope.local.termos,
                    name : $scope.local.termos
                };

                $scope.local.lista.enderecos = [];
                $scope.local.lista.estabelecimentos = [];

                if(!map){
                    $scope.getLocation(function () {
                        service = new google.maps.places.PlacesService(map);
                        service.nearbySearch(request, callback);
                    });
                }else{
                    service = new google.maps.places.PlacesService(map);
                    service.nearbySearch(request, callback);
                }
            };

            function callback(results, status,pagination) {

                var place = {};

                if (status == google.maps.places.PlacesServiceStatus.OK) {

                    for (var i = 0; i < results.length; i++) {

                        place = {
                            name: results[i].name,
                            address: results[i].vicinity,
                            lat: results[i].geometry.location.lat(),
                            lng: results[i].geometry.location.lng(),
                            id: results[i].place_id,
                            phone: '',
                            openNow : results[i].opening_hours ? results[i].opening_hours.open_now : ''
                        };

                        $scope.local.lista.estabelecimentos.push(place);
                    }
                    if(pagination){
                        if(pagination.hasNextPage){
                            pagination.nextPage();
                        }else{
                            $scope.$apply();
                            $scope.stopSpin();
                        }
                    }else{
                        $scope.$apply();
                        $scope.stopSpin();
                    }
                }
                 else {
                    $scope.stopSpin();
                    MessageService.addError("Nenhum resultado encontrado!");
                }

            }

            $scope.enterPressed = function (e) {
                if (e.keyCode == 13) {
                    $scope.onSearch();
                    return false;
                }else{
                    if (e.keyCode == 39 && e.currentTarget.name != 'termos') {
                        $scope.onOptions();
                        return false;
                    }
                }
            };

            $scope.createMarkerEndereco = function createMarkerEndereco() {
                $scope.startSpin();
                var markerCount = 0;
                var infowindow = {};

                angular.forEach($scope.local.lista.enderecos,function (place) {
                    var contentString = "<div id='content' style='color:#444;'><div id='siteNotice'></div>" +
                        "<div id='bodyContent' class='text-left'  style='color:#444';>" +
                        "<p><i class='fa fa-map-marker'></i>&nbsp; Lat - " + place.geometry.location.lat + "</p>" +
                        "<p><i class='fa fa-map-marker'></i>&nbsp;Lng - " + place.geometry.location.lng + "</p>" +
                        "<p><i class='fa fa-info'></i>&nbsp;" + place.formatted_address + "</p>" +
                        "<p><i class='fa fa-map'><a href='" + place.url + "' target='_blank'>&nbsp;Ver no google maps</a></p></div></div>";

                    infowindow = new google.maps.InfoWindow();

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng),
                        map: map,
                        animate: google.maps.Animation.BOUNCE,
                        title: place.name
                    });

                    markersEnderecos.push(infowindow);

                    markerCount++;

                    google.maps.event.addListener(marker, 'mouseover', (function (marker) {
                        return function () {
                            closeInfos(markersEnderecos);
                            infowindow.setContent(contentString);
                            infowindow.open(map, marker);
                        }
                    })(marker, markerCount));

                });
                map.panTo(location);
                $scope.stopSpin();
            };

            $scope.getDetalhesEstabelecimentos = function (id,callback) {
                $scope.startSpin();
                    service.getDetails({
                        placeId: id
                    }, function (details, status) {
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            var detail = {
                                name : details.name,
                                phoneNumber : details.formatted_phone_number,
                                address : details.formatted_address,
                                website : details.website,
                                url : details.url,
                                photo : details.photos ? details.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100}) : '' || details.icon ? details.icon : ''
                            };
                            callback(detail);
                        }
                        $scope.stopSpin();
                    });
            };

            $scope.getTemplate = function (detail) {
                return '<div class="bs-info">' +
                    '<div class="media">' +
                    '<div class="media-left">' +
                    '<a href="'+detail.website+'">' +
                    '<img alt="100x100" ng-src="'+ detail.photo +'" class="media-object"  data-holder-rendered="true" style="width: 100px; height: 100px;">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body" style="text-align:left;">' +
                    '<h3 class="media-heading">'+ detail.name +'</h3>' +
                    '<span><i class="fa fa-phone"></i>&nbsp; '+ detail.phoneNumber + '</span></br>' +
                    '<span><i class="fa fa-info"></i>&nbsp;<a href="'+ detail.website +'">'+ detail.website +'</a></span></br>' +
                    '<span><i class="fa fa-info"></i>&nbsp; '+ detail.address +'</span></br></br>' +
                    '<span><i class="fa fa-map-marker"></i><a href="'+ detail.url + '" target="_blank">&nbsp;Ver no google maps</a></span></br></p>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            };

            $scope.visualizarDetalheEstabelecimento = function (detail) {
                var template = $scope.getTemplate(detail);
                var modalDetail = ngDialog.open({
                    template: template,
                    plain: true
                });
                return modalDetail;
            };

            $scope.createMarkerEstabelecimento = function createMarkerEstabelecimento() {

                angular.forEach($scope.local.lista.estabelecimentos,function (place) {
                    var infowindow = {};
                    var markerCount = 0;

                    infowindow = new google.maps.InfoWindow();

                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(place.lat, place.lng),
                        map: map,
                        animate: google.maps.Animation.BOUNCE,
                        title: place.name
                    });

                    markerCount++;
                    markersEstabelecimentos.push(infowindow);

                    google.maps.event.addListener(marker, 'mouseover', (function (marker) {
                        return function () {
                            closeInfos(markersEstabelecimentos);
                            $scope.getDetalhesEstabelecimentos(place.id,function (detail) {
                                var contentString = $scope.getTemplate(detail);
                                infowindow.setContent(contentString);
                                infowindow.open(map, marker);
                            });
                        }
                    })(marker, markerCount));
                });
                map.panTo(location);
                $scope.stopSpin();
            };

            function closeInfos(markers) {
                for(var i=0; i<markers.length; i++)
                {
                    markers[i].close();
                }
            }

        }]);



// // $('button').click(function() {
// //    var flickerAPI = "https://jsonplaceholder.typicode.com/users";
// //   //  var data = {
// //   //   tags: "goats",
// //   //   format: "json"
// //   // };
// //    $.getJSON( flickerAPI,
// //     function( data ) { //receive JSONP back from server
// //       var imglinks = '<ul>';
// //       $.each( data, function( i, users ) { //iterate through each object in the array
// //         imglinks += '<li>' + users.name + '</li>';
// //         if ( i === 10 ) {
// //           return false;
// //         }
// //       });
// //       imglinks += '</ul>';
// //       $('.images').html(imglinks);
// //     });
// // });


// // $('button').click(function() {
// //   $.getJSON( "../test.json",
// //    function( data ) { //receive JSONP back from server
// //     console.log(data.header.custrecord_nbcu_so_p_tranid);
// //     let connectorData = "";
// //         for (i = 0 ; i < 5 ; i ++ ){
// //             console.log(data.lines[i].custrecord_nbcu_so_c_ext_line_key);
// //             connectorData += data.lines[i].custrecord_nbcu_so_c_ext_line_key + ",";
// //         };
// //     $('.images').html(connectorData);
// //    });
// // });

$('button').click(function() {
    $.getJSON( "../test.json",
     function( data ) { //receive JSONP back from server
    //   console.log(data.items.custrecord_nbcu_so_p_tranid);
    // let connectorData = 0;
          console.log(data.value.length);
      //     for (i = 0 ; i < data.values.length ; i ++ ){
      //         console.log(data.items.length);
      //         console.log(data.items[i].quantity);
      //         connectorData = Number(data.items[i].quantity) + connectorData;
      //     };
      // $('.images').html(connectorData);
     });
  });
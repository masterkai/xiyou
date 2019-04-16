import $ from 'jquery'
import axios from 'axios'
//測試用假資料 https://api.myjson.com/bins/1h0le4
//表單共用檢查 name mobile cityno townno per_chk
export function checkinfo(JSonData) {
  if (JSonData.name === "" || ischinese(JSonData.name) === false) {
    alert('請填寫中文姓名。');
    // $('#sBut').show();
    return false;
  }
  if (JSonData.mobile === "") {
    alert('請填寫行動電話。');
    // $('#sBut').show();
    return false;
  }
  if (isNaN(JSonData.mobile) === true || JSonData.mobile.length !== 10 || JSonData.mobile.substring(0, 2) !== "09") {
    alert('請填寫正確的行動電話格式。');
    // $('#sBut').show();
    return false;
  }
  if (JSonData.cityno === "") {
    alert('請選擇所在縣市。');
    // $('#sBut').show();
    return false;
  }
  if (JSonData.townno === "") {
    alert('請選擇所在區域。');
    // $('#sBut').show();
    return false;
  }
  if (JSonData.per_chk === 0) {
    alert('請勾選同意個資保護聲明。');
    // $('#sBut').show();
    return false;
  }
  return true;
}

//共用表單檢查 姓名必須是中文
export function ischinese(s) {
  let ret = true;
  for (let i = 0; i < s.length; i++)
    ret = ret && (s.charCodeAt(i) >= 10000);
  return ret;
}

export function goSubmit(JSonData, func1, func2) {
  JSonData.rec_id = QueryString("ycmp");
  $.ajax({
    type: "post",
    url: "/wGuest/func.aspx",
    data: JSonData,
    dataType: 'jsonp',             // xml/json/script/html
    cache: false,                   // 是否允許快取
    success: function (response) {
      func1(response);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      func2(thrownError);
    },
    beforeSend: function (xhr) {     // 設定 RequestHeader
      xhr.setRequestHeader("Accept", "text/javascript");
    }
  });
}

export function parentQueryString(fieldName) {
  let urlString = parent.document.location.search;
  if (urlString !== null) {
    let typeQu = fieldName + "=";
    let urlEnd = urlString.indexOf(typeQu);
    if (urlEnd !== -1) {
      let paramsUrl = urlString.substring(urlEnd + typeQu.length);
      let isEnd = paramsUrl.indexOf('&');
      if (isEnd !== -1) {
        return paramsUrl.substring(0, isEnd);
      } else {
        return paramsUrl;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function QueryString(fieldName) {
  let urlString = document.location.search;
  if (urlString != null) {
    let typeQu = fieldName + "=";
    let urlEnd = urlString.indexOf(typeQu);
    if (urlEnd !== -1) {
      let paramsUrl = urlString.substring(urlEnd + typeQu.length);
      let isEnd = paramsUrl.indexOf('&');
      if (isEnd !== -1) {
        return paramsUrl.substring(0, isEnd);
      } else {
        return paramsUrl;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function GetUsingURL() {
  let url = document.location.href.substring(0, document.location.href.indexOf('?'));
  url = url === "" ? document.location.href : url;
  return url;
}
let dept = "";
let seq_no = "G001";
let web_pno = "10803B100005";
let cityno;
let deptno = null;


export function default_city_no() {
  let dJSonData = {
    "func": "ruxmslnlnjonr",
    "dept": dept,
    "seq_no": seq_no,
    "web_pno": web_pno
  }

  $.ajax({
    type: "get",
    url: "https://api.myjson.com/bins/1h0le4",
    data: dJSonData,
    cache: false,
    success: function (response) {
      cityno = response[0].tCity.split(';');
      deptno = eval(response[0].tArea)[0];
      console.log(deptno);
      $('#ddl_city_no').html("");
      $('#ddl_city_no').append('<option value="">選擇縣市</option>');
      for (let i = 0; i < cityno.length; i++) {
        let tCity = cityno[i].split(',');
        $('#ddl_city_no').append('<option value="' + tCity[1] + '">' + tCity[0] + '</option>');
      }
      $('#ddl_area_no').html("");
      $('#ddl_area_no').append('<option value="">選擇區鄉鎮</option>');
      $('#ddl_city_no').attr('disabled', false);
      $('#ddl_area_no').attr('disabled', false);
      let msg = response[1].ShowMsg;
      let url = response[1].ShowURL;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(`error: ${xhr.responseText} : ${thrownError}`);
    },
    beforeSend: function (xhr) {
      xhr.setRequestHeader("Accept", "text/javascript");
    }
  });
}

export function city_change() {
  $('#ddl_area_no').html("");
  let k = $('#ddl_city_no :selected').val();
  if (k !== "") {
    let dept = deptno["A" + k].split(';');
    $('#ddl_area_no').append('<option value="">選擇區鄉鎮</option>');
    for (let i = 0; i < dept.length; i++) {
      let tArea = dept[i].split(',');
      $('#ddl_area_no').append('<option value="' + tArea[1] + '">' + tArea[0] + '</option>');
    }
  } else {
    $('#ddl_area_no').append('<option value="">選擇區鄉鎮</option>');
  }
}


//=========================================
export function seq_city_no() {
  let dJSonData = {
    "func": "rwrngutyrt",
    "dept": dept,
    "seq_no": seq_no,
    "web_pno": web_pno
  }
  $.ajax({
    type: "post",
    url: "/wGuest/func.aspx",
    // data: dJSonData,
    dataType: 'jsonp',             // xml/json/script/html
    cache: false,                   // 是否允許快取
    success: function (response) {
      cityno = response[0].tCity.split(';');
      deptno = eval(response[0].tDept)[0];
      $('#ddl_city_no').html("");
      $('#ddl_city_no').append('<option value="">選擇縣市</option>');
      for (let i = 0; i < cityno.length; i++) {
        let tCity = cityno[i].split(',');
        $('#ddl_city_no').append('<option value="' + tCity[1] + '">' + tCity[0] + '</option>');
      }
      $('#ddl_area_no').html("");
      $('#ddl_area_no').append('<option value="">選擇分校</option>');
      $('#ddl_city_no').attr('disabled', false);
      $('#ddl_area_no').attr('disabled', false);
      let msg = response[1].ShowMsg;
      let url = response[1].ShowURL;
      /*
      $(window).bind("beforeunload", function () {
      return popUpSet(msg, url);
      });
      */
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
    beforeSend: function (xhr) {     // 設定 RequestHeader
      xhr.setRequestHeader("Accept", "text/javascript");
    }
  });
}

export function seq_city_change() {
  $('#ddl_area_no').html("");
  let k = $('#ddl_city_no :selected').val();
  if (k !== "") {
    let dept = deptno["A" + k].split(';');
    $('#ddl_area_no').append('<option value="">選擇分校</option>');
    for (let i = 0; i < dept.length; i++) {
      let tDept = dept[i].split(',');
      $('#ddl_area_no').append('<option value="' + tDept[1] + '">' + tDept[0] + '</option>');
    }
  } else {
    $('#ddl_area_no').append('<option value="">選擇分校</option>');
  }
}


export function Chk_Tcode() {
  let dJSonData = {
    "func": "YTcodeGet",
    "pno": web_pno,
    "fromto": QueryString("fromto") != null ? QueryString("fromto") : ""
  }
  $.ajax({
    type: "POST",
    url: "/wGuest/Yahoo_Tcode.aspx",
    data: dJSonData,
    dataType: 'jsonp',             // xml/json/script/html
    cache: false,                   // 是否允許快取
    success: function (response) {

      $('body').append('<div id="JScript"></div>');
      if (response[0].Yahoo_Flag === "Y") {
        let Yahoo_Tcode;
        Yahoo_Tcode = "<script>doVisit('" + response[0].pno + "','Computer','" + response[0].pname + "','" + response[0].group_no + "');</script>";
        $('#JScript').html(Yahoo_Tcode);
      }

    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(xhr.responseText);
    },
    beforeSend: function (xhr) {     // 設定 RequestHeader
      xhr.setRequestHeader("Accept", "text/javascript");
    }
  });
}

let IsC = false;

export function popUpSet(msg, url) {
  if (msg !== "" && url !== "") {
    let IsIE = navigator.userAgent.search("MSIE") > -1;
    let IsFireFox = navigator.userAgent.search("Firefox") > -1;
    if (IsC === false) {
      if (IsIE || IsFireFox) {
        location.href = url;
        return msg;
      } else {
        IsC = true;
        setTimeout(function () {
          location.href = url;
        }, 180);
        return msg;
      }
    }
  }
}

export function se() {
  let from2 = QueryString("fromto") !== null ? QueryString("fromto") : "";
  $('body').append('<iframe src="/wGuest/se.asp" width="0" height="0" style="display:none;" ></iframe>');
  $('body').append('<iframe src="/activity/phone/Yahoo_Tcode.asp?pno=' + web_pno + '&fromto=' + from2 + '&fromurl=' + escape(document.location) + '" width="0" height="0" style="display:none;" ></iframe>');
}

export function s(data) {
  if (data[0].result === "1") {
    $("#name").val("");
    $("#mobile").val("");
    alert('送出成功！');
    // $("#sBut").show();
    // document.location.href = "/wGuest/loadover.htm";
    doConversion()


  } else {
    alert('送出失敗！');
    console.log(data);
    // $("#sBut").show();
  }
}

export function f(data) {
  alert(data);
  // $("#sBut").show();
}

export function doConversion(p) {
  // Google
  window.dataLayer=window.dataLayer||[];
  function gtag() { dataLayer.push(arguments); }

  gtag('event','conversion',{
    'send_to': 'AW-1066746510/KzPbCPTsjAEQjoXV_AM',
    'value': 5.0,
    'currency': 'TWD'
  });

  // Line
  _lt('send','cv',{
    type: 'Conversion'
  },['dc3ee8c6-2e89-4252-8676-d5b5340822b4']);

}

$(function () {
  // if (typeof (seq_School) === "undefined") {
  //   default_city_no();
  //
  //   $('#ddl_city_no').change(function () {
  //     city_change();
  //   });
  // } else if (seq_School === "Y") {
  //   seq_city_no();
  //   $('#ddl_city_no').change(function () {
  //     seq_city_change();
  //   });
  // } else {
  //   default_city_no();
  //   $('#ddl_city_no').change(function () {
  //     city_change();
  //   });
  // }
  //se();
});
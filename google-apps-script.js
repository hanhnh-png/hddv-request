function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Responses");
    }
    
    // Parse data from form POST or fetch
    var data;
    if (e.parameter && e.parameter.payload) {
      data = JSON.parse(e.parameter.payload);
    } else if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      throw new Error("No data received");
    }
    
    // Create headers if first row is empty
    if (sheet.getLastRow() === 0) {
      var headers = [
        "Timestamp",
        "Họ tên",
        "Team",
        "Email",
        "Tên sự kiện",
        "BTC/Đối tác",
        "Thể loại",
        "Ngày diễn ra",
        "Địa điểm",
        "Quy mô",
        "Mức độ ưu tiên",
        "Link sự kiện",
        "Working file",
        "Assets",
        "Ghi chú BTC",
        "Presale",
        "Presale - Ngày",
        "Presale - Đối tượng",
        "Early Bird",
        "Early Bird - Ngày",
        "Early Bird - Giá",
        "General Sale",
        "General Sale - Ngày",
        "Phòng chờ",
        "Phòng chờ - Thời gian",
        "Hàng chờ",
        "Tặng vé",
        "Lưu ý thanh toán",
        "Lưu ý thanh toán - Chi tiết",
        "FB Post",
        "FB Post - Số lượng",
        "FB Post - Loại",
        "Banner Homepage",
        "Push Notification",
        "Email MKT",
        "Email MKT - Đối tượng",
        "Blog post",
        "Ngày bắt đầu",
        "Deadline",
        "Ngày mở bán",
        "Trạng thái"
      ];
      sheet.appendRow(headers);
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1A1A2E");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    var row = [
      new Date().toLocaleString("vi-VN"),
      data.name || "",
      data.team || "",
      data.email || "",
      data.eventName || "",
      data.organizer || "",
      data.eventType || "",
      data.eventDate || "",
      data.venue || "",
      data.capacity || "",
      data.priority || "",
      data.eventLink || "",
      data.workingFile || "",
      data.assets || "",
      data.btcNotes || "",
      data.presale ? "✅" : "",
      data.presaleDate || "",
      data.presaleTarget || "",
      data.earlybird ? "✅" : "",
      data.earlybirdDate || "",
      data.earlybirdPrice || "",
      data.generalSale ? "✅" : "",
      data.generalSaleDate || "",
      data.waitingRoom ? "✅" : "",
      data.waitingRoomTime || "",
      data.queue ? "✅" : "",
      data.giftTicket ? "✅" : "",
      data.paymentNote ? "✅" : "",
      data.paymentNoteText || "",
      data.fbPost ? "✅" : "",
      data.fbPostCount || "",
      (data.postTypes || []).join(", "),
      data.banner ? "✅" : "",
      data.pushNotif ? "✅" : "",
      data.emailMkt ? "✅" : "",
      data.emailTarget || "",
      data.blogPost ? "✅" : "",
      data.startDate || "",
      data.deadline || "",
      data.saleDate || "",
      "📥 Mới"
    ];
    
    sheet.appendRow(row);
    sheet.autoResizeColumns(1, row.length);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "HDDV Form API is running" }))
    .setMimeType(ContentService.MimeType.JSON);
}

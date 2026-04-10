/**
 * HDDV Request Form - Google Apps Script
 * 
 * HƯỚNG DẪN CÀI ĐẶT:
 * 1. Tạo Google Sheet mới: https://sheets.new
 * 2. Đặt tên sheet tab đầu tiên là "Responses"
 * 3. Vào Extensions > Apps Script
 * 4. Xoá code mặc định, paste toàn bộ code này vào
 * 5. Bấm Deploy > New deployment
 *    - Select type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy URL deployment → paste vào file index.html (dòng SCRIPT_URL)
 * 7. Done!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Responses");
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet("Responses");
    }
    
    var data = JSON.parse(e.postData.contents);
    
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
      
      // Format header
      var headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1A1A2E");
      headerRange.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }
    
    // Append data row
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
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, row.length);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Đã lưu thành công!" }))
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

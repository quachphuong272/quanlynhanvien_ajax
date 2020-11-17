console.log(axios);
var validate = new Validation();

//Kết nối dữ liệu backend dựa vào thư viện axios
var nvService = new NhanVienService();
var layDanhSachNhanVienApi = function () {

    var promise = nvService.layDanhSachNhanVien(); //Gọi đến backend lấy data

    //Xử lý cho trường hợp gọi thành công
    promise.then(function (result) {
        console.log('Kết quả', result.data);
        //Lấy dữ liệu server trả về gọi hàm tạo table
        renderTable(result.data)
    });

    //Xử lý cho trường hợp thất bại
    promise.catch(function (error) {
        console.log(error);
    })
}

var renderTable = function (mangNhanVien) {
    var noiDungTable = '';
    for (var i = 0; i < mangNhanVien.length; i++) {
        //Từ dữ liệu api tạo đối tượng lưu trữ
        var nv = new NhanVien();
        nv.maNhanVien = mangNhanVien[i].maNhanVien;
        nv.tenNhanVien = mangNhanVien[i].tenNhanVien;
        nv.chucVu = mangNhanVien[i].chucVu;
        nv.heSoChucVu = mangNhanVien[i].heSoChucVu;
        nv.luongCoBan = mangNhanVien[i].luongCoBan;
        nv.soGioLamTrongThang = mangNhanVien[i].soGioLamTrongThang;
        //Tạo các tr chứa thông tin sinh viên tương ứng
        noiDungTable += `
            <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td>${nv.soGioLamTrongThang}</td>
            <td>${nv.xepLoai()}</td>
            <td><button class="btn btn-primary" onclick="suaNhanVien('${nv.maNhanVien}')">Sửa</button></td>
            <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
        </tr>
        `;
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

layDanhSachNhanVienApi();


//---Chức năng thêm sinh viên lưu trữ vào server thông qua api backend---
document.querySelector('#btnXacNhan').onclick = function () {
    //Lấy dữ liệu từ người dùng nhập vào
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
    //Dùng axios đưa dữ liệu về server thông qua api backend cung cấp
    var promise = nvService.themNhanVien(nv);

    //Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);

        // location.reload();
        //Gọi phương thức lấy thông tin sinh viên tạo lại table mới
        layDanhSachNhanVienApi();
    });

    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function (error) {
        console.log(error.response.data);
    })

    var valid = true;
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien')

   valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.gioLamTrongThang, 'Số giờ làm', '.kiemTraGiaTri-gioLamTrongThang', 50, 150);

   valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

   if (!valid) {
    return;
}
}

//---------Chức năng xóa sinh viên server dựa vào api backend------------

var xoaNhanVien = function (maNhanVien) {
    var promise = nvService.xoaNhanVien(maNhanVien);
    //Hàm xử lý thành công
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    })
    //Hàm xử lý thất bại
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

var suaNhanVien = function (maNhanVien) {
    // alert(maSinhVien);
    var promise = nvService.suaNhanVien(maNhanVien);


    promise.then(function (result) {
        var nv = result.data;
        //Gán dữ liệu server trả về lên giao diện người dùng nhập thông tin
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#chucVu').value = nv.chucVu;
        document.querySelector('#luongCoBan').value = nv.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });

}

//Chức năng lưu thông tin sinh viên server dựa vào api backend cung cấp

document.querySelector('#btnLuuThongTin').onclick = function () {
    //Lấy dữ liệu từ người dùng nhập đưa vào đối tượng theo format dữ liệu của Backend yêu cầu
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSochucVu= document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    //Gọi ajax đưa dữ liệu về server cập nhật
    var promise = nvService.capNhatNhanVien(nv.maNhanVien, nv);


    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienApi();
    });


    promise.catch(function (error) {
        console.log(error.response.data);
    })

    var valid = true;
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien')

   valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.gioLamTrongThang, 'Số giờ làm', '.kiemTraGiaTri-gioLamTrongThang', 50, 150);

   valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

   if (!valid) {
    return;
}

}



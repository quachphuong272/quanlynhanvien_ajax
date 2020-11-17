var mangNhanVien = [];
var validate = new Validation();
document.querySelector('#btnXacNhan').onclick = function () {
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSoChucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.gioLamTrongThang = document.querySelector('#gioLamTrongThang').value;

    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    console.log(nv.chucVu);

    var valid = true;
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien')

   valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.gioLamTrongThang, 'Số giờ làm', '.kiemTraGiaTri-gioLamTrongThang', 50, 150);

   valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

   if (!valid) {
    return;
}

    mangNhanVien.push(nv);
    renderTable(mangNhanVien);
    luuLocalStorage();
}

var renderTable = function (arrNV) {
    var noiDungTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nhanVien = arrNV[index];
        var nv = new NhanVien(nhanVien.maNhanVien, nhanVien.tenNhanVien, nhanVien.chucVu, nhanVien.heSoChucVu, nhanVien.luongCoBan, nhanVien.gioLamTrongThang);
        noiDungTable += `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${nv.tinhTongLuong()}</td>
            <td>${nv.gioLamTrongThang}</td>
            <td>${nv.xepLoai()}</td>
            <td><button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')">Sửa</button></td>
            <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
        </tr>
        `
    }
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}

var xoaNhanVien = function (maNV) {
    //mangSinhVien= [{ma:1,ten:'a'},{ma:2,ten:'b'},{ma:3,ten:'c'}];
    for (var index = mangNhanVien.length - 1; index >= 0; index--) {
        //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên
        var nv = mangNhanVien[index];

        //Lấy mã sinh viên của từng đối tượng so sánh với maSV được click
        if (nv.maNhanVien === maNV) {
            //splice là hàm xóa phần tử của mảng dự vào index
            mangNhanVien.splice(index, 1);
        }
    }
    //Sau khi xóa dữ liệu trong mảng gọi hàm tạo lại table truyền vào mảng sinh viên đã xóa
    renderTable(mangNhanVien);
}

var chinhSua = function (maNV) {
    document.querySelector('#maNhanVien').disabled = true;
    // từ mã sinh viên => tìm sinh viên trong mangSinhVien
    for (var index = 0; index < mangNhanVien.length; index++) {
        var nv = mangNhanVien[index];

        // so sánh nếu maSV truyền vào === với đối tượng đang duyệt => gán ngược lại lên các control phía trên
        if (maNV === nv.maNhanVien) {
            document.querySelector('#maNhanVien').value = nv.maNhanVien;
            document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
            document.querySelector('#chucVu').value = nv.chucVu;
            document.querySelector('#luongCoBan').value = nv.luongCoBan;
            document.querySelector('#gioLamTrongThang').value = nv.gioLamTrongThang;
        }
    }
}

var luuLocalStorage = function () {
    // Biến mảng sinh viên thành chuỗi
    var sMangNhanVien = JSON.stringify(mangNhanVien);
    // Đem chuỗi mảng sinh viên lưu vào localstorage
    localStorage.setItem('mangNhanVien', sMangNhanVien);
}

var layMangNhanVienStorage = function () {
    // Kiểm tra dữ liệu có trong localStorage không
    if (localStorage.getItem('mangNhanVien')) {
        // lấy dữ liệu được lưu trong localstorage ra ngoài
        var sMangNhanVien = localStorage.getItem('mangNhanVien');
        // Biến dữ liệu từ chuỗi chuyển về object js gán vào mangSinhVien
        mangNhanVien = JSON.parse(sMangNhanVien);
        // Sau khi lấy dữ liệu ra gọi hàm tạo bảng
        renderTable(mangNhanVien);
    }
}

layMangNhanVienStorage();

document.querySelector('#btnLuuThongTin').onclick = function () {
    // Lấy thông tin người dùng nhập vào gán vào đối tượng sinh viên
    var nv = new NhanVien();
    nv.maNhanVien = document.querySelector('#maNhanVien').value;
    nv.tenNhanVien = document.querySelector('#tenNhanVien').value;
    nv.heSochucVu = document.querySelector('#chucVu').value;
    nv.luongCoBan = document.querySelector('#luongCoBan').value;
    nv.gioLamTrongThang = document.querySelector('#gioLamTrongThang').value;

    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;

    var valid = true;
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên nhân viên', '.kiemTraDinhDang-tenNhanVien')

   valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương cơ bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.gioLamTrongThang, 'Số giờ làm', '.kiemTraGiaTri-gioLamTrongThang', 50, 150);

   valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã nhân viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

   if (!valid) {
    return;
}

    for(var index =0; index<mangNhanVien.length; index++)
    {
        var nhanVienCapNhat = mangNhanVien[index];
        // Tìm ra sinhVien trong mảng có mã = với mã sv trong giao diện => cập nhật giá trị
        if(nhanVienCapNhat.maNhanVien === nv.maNhanVien)
        {
        nhanVienCapNhat.maNhanVien = nv.maNhanVien;
        nhanVienCapNhat.tenNhanVien = nv.tenNhanVien ;
        nhanVienCapNhat.chucVu = nv.chucVu;
        nhanVienCapNhat.luongCoBan = nv.luongCoBan;
        nhanVienCapNhat.gioLamTrongThang = nv.gioLamTrongThang;
        }
    }
    // gọi hàm tạo lại bảng
    renderTable(mangNhanVien);
    // lưu localstorage
    luuLocalStorage();
}
var NhanVien = function (maNV, tenNV, chucVu, heSoChucVu, luongCoBan, soGioLamTrongThang){
    this.maNhanVien=maNV;
    this.tenNhanVien=tenNV;
    this.chucVu=chucVu;
    this.heSoChucVu=heSoChucVu;
    this.luongCoBan=luongCoBan;
    this.soGioLamTrongThang=soGioLamTrongThang;

    this.tinhTongLuong = function(){
        return Number(this.luongCoBan) * Number(this.heSoChucVu);
    }
    this.xepLoai= function(){
        var xepLoai;
        if(this.soGioLamTrongThang>=120)
        {
            xepLoai = 'Nhân viên xuất sắc';
        }
        else if(this.soGioLamTrongThang>100 && this.soGioLamTrongThang <=120)
        {
            xepLoai = 'Nhân viên giỏi';
        }
        else if(this.soGioLamTrongThang>80 && this.soGioLamTrongThang <=100)
        {
            xepLoai = 'Nhân viên khá';
        }
        else if(this.soGioLamTrongThang>50 && this.soGioLamTrongThang <=80)
        {
            xepLoai = 'Nhân viên trung bình';
        }
        else
        {
            xepLoai = 'Chưa xác định';
        }
        return xepLoai;
    }
}
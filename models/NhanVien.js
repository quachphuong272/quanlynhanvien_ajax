var NhanVien = function (maNV, tenNV, chucVu, heSoChucVu, luongCoBan, gioLamTrongThang){
    this.maNhanVien=maNV;
    this.tenNhanVien=tenNV;
    this.chucVu=chucVu;
    this.heSoChucVu=heSoChucVu;
    this.luongCoBan=luongCoBan;
    this.gioLamTrongThang=gioLamTrongThang;

    this.tinhTongLuong = function(){
        return Number(this.luongCoBan) * Number(this.heSoChucVu);
    }
    this.xepLoai= function(){
        var xepLoai;
        if(this.gioLamTrongThang>=120)
        {
            xepLoai = 'Nhân viên xuất sắc';
        }
        else if(this.gioLamTrongThang>100 && this.gioLamTrongThang <=120)
        {
            xepLoai = 'Nhân viên giỏi';
        }
        else if(this.gioLamTrongThang>80 && this.gioLamTrongThang <=100)
        {
            xepLoai = 'Nhân viên khá';
        }
        else if(this.gioLamTrongThang>50 && this.gioLamTrongThang <=80)
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
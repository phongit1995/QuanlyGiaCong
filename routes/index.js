var express = require('express');
var router = express.Router();
const sql = require('mssql');
const config = {
  user: 'admin',
  password: 'pmtt2019',
  server: 'pmttau.ddns.net', // You can use 'localhost\\instance' to connect to named instance
  database: 'PMTT_GROUP_ERP',

  options: {
      encrypt: true // Use this if you're on Windows Azure
  }
}
 


/* GET home page. */
router.get('/', function(req, res, next) {
  sql.connect(config).then(() => {
    return sql.query`SELECT t1.GiaCongID, t2.TenNM AS NhaMay, t3.TenMGC AS MayGiaCong, t4.MaNV AS NhanVien, t5.MaBV AS BanVe, t1.SoLuong, t1.BatDauTG, t1.KetThucTG, t6.MaDH AS DonHang, t1.TrangThai, t1.GhiChu FROM dbo.GiaCong t1 LEFT JOIN dbo.NhaMay t2 ON t1.NhaMayID = t2.NhaMayID LEFT JOIN dbo.MayGiaCong t3 ON t1.MayGiaCongID = t3.MayGiaCongID LEFT JOIN dbo.NhanVien t4 ON t1.NhanVienID = t4.NhanVienID LEFT JOIN dbo.BanVe t5 ON t1.BanVeID = t5.BanVeID LEFT JOIN dbo.DonHang t6 ON t1.DonHangID = t6.DonHangID WHERE t1.NhaMayID=4 ORDER BY t1.BatDauTG DESC`
}).then(result => {
    console.log(result.recordset);
    res.render("index",{ ketqua:result.recordset,title:"Quản Lý Gia Công"});
}).then( ()=>{
  sql.close();
}

).catch(err => {
    // ... error checks
    
    if(erro)
    res.send("Connect Chưa Thành Công");
    console.log(err);
   
})
 
sql.on('error', err => {
    res.send("Connect Chưa Thành Công");
})
});

module.exports = router;

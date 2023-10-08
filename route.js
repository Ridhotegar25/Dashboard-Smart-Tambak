const router = require('express').Router();
const dipasena_http = require('./controler_http.js');
// 
router.get('/dipasena/latest', dipasena_http.getDataDipasena);// route request to respond lastest 100 data
router.get('/dipasena/tabel', dipasena_http.getDataTabel);// route request to respond lastest tabel

// 
router.get('/dipasena/suhuAir', dipasena_http.getDataSuhuAir); // route req to get data Suhu air dasar dan permukaan 
router.get('/dipasena/ph', dipasena_http.getDataPh);// route req to res data ph air 
router.get('/dipasena/chart/do', dipasena_http.getDataChartDo); // // route req to res line chart Disolve Oxygen
router.get('/dipasena/chart/salinitas', dipasena_http.getDataChartSalinitas); // // route req to res line chart salinitas 
router.get('/dipasena/chart/suhuRuang', dipasena_http.getDataChartSuhuRuang);// route req to res line chart suhu ruang 
router.get('/dipasena/chart/amonia', dipasena_http.getDataChartAmonia);// route req to res line chart kadar amonia air 
router.get('/dipasena/chart/tinggiAir', dipasena_http.getDataChartTinggiAir);// route req to res data ketinggian air  


router.get('/dipasena/fluxPh', dipasena_http.get_ph_fluctuation);// route req to res fluktuasi ph 6 jam terakhir 
router.get('/dipasena/fluxSuhuAir', dipasena_http.get_suhuAir_fluc);// route req to res fluktuasi suhu air 6 jam terakhir 

router.get('/dipasena/time/:time', dipasena_http.get_byTime_obj);
// route req : berdasarkan time dan dengan respon menjadi object 
module.exports = router;
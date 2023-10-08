
const path = require('path');
const moment = require('moment');
const {Pool} = require('pg')
const { off } = require('process');
const { start } = require('repl');
require('dotenv').config()
require('fs');
const dbase_rest= new Pool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DIPASENA
})
dbase_rest.connect();
module.exports = {

    // HTTP HANDLING
    // Respond request to give latest 10 data
    async getDataDipasena(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();    
        // Mendapatkan tanggal 6 jam sebelumnya
        const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time,  
                suhu_ruang, 
                salinitas, 
                oxygen, 
                amonia, 
                tinggi_air 
            FROM 
                tambak_dipasena 
            WHERE 
                (EXTRACT(MONTH FROM time) = $1 AND EXTRACT(YEAR FROM time) = $2) OR
                (EXTRACT(MONTH FROM time) = $3 AND EXTRACT(YEAR FROM time) = $4 AND time >= $5)
            ORDER BY 
                time DESC 
            LIMIT 15
        `;
    
        const data = await dbase_rest.query(query, [currentMonth, currentYear, currentMonth - 1, currentYear, sixHoursAgo]);
    
        res.status(200);
        res.send({
            count: data.rowCount,
            result: data.rows,
        });
    
        console.log("[REST-API DIPASENA] GET: 15 NEW DATA FOR TABEL");
    },

    //  MENDAPATKAN 10 DATA TERBARU UNTUK TABEL 
    async getDataTabel(req, res) {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1; // Mendapatkan bulan saat ini
        const currentYear = currentDate.getFullYear();    
        // Mendapatkan tanggal 6 jam sebelumnya
        const sixHoursAgo = new Date(currentDate.getTime() - 6 * 60 * 60 * 1000);
        // Menggunakan kondisi WHERE untuk memfilter data
        const query = `
            SELECT 
                to_char(time, 'DD-MM-YYYY HH24:MI:SS') as time, 
                suhu_air_permukaan, 
                suhu_air_dasar, 
                suhu_ruang, 
                salinitas, 
                oxygen, 
                ph, 
                amonia, 
                tinggi_air 
            FROM 
                tambak_dipasena 
            WHERE 
                (EXTRACT(MONTH FROM time) = $1 AND EXTRACT(YEAR FROM time) = $2) OR
                (EXTRACT(MONTH FROM time) = $3 AND EXTRACT(YEAR FROM time) = $4 AND time >= $5)
            ORDER BY 
                time DESC 
            LIMIT 15
        `;
    
        const data1 = await dbase_rest.query(query, [currentMonth, currentYear, currentMonth - 1, currentYear, sixHoursAgo]);
    
        res.status(200);
        res.send({
            count: data1.rowCount,
            result: data1.rows,
        });
    
        console.log("[REST-API DIPASENA] GET: 15 NEW DATA FOR TABEL");
    },
    
        
    // CHART SUHU AIR  
    async getDataSuhuAir(req, res) {
        data2 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time1, suhu_air_permukaan,suhu_air_dasar FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data2.rowCount,
            result:data2.rows,
        })
        console.log("[REST-API DIPASENA] GET :60 DATA CHART SUHU AIR ");
    },

    // CHART PH
    async getDataPh(req, res) {
        data3 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time2, ph FROM tambak_dipasena ORDER BY time DESC LIMIT 100`);

        res.status(200);
        res.send({
            count:data3.rowCount,
            result:data3.rows,
        })
        console.log("[REST-API DIPASENA] GET :60 DATA PH");
    },
    // CHART kadar Oksigen
    async getDataChartDo(req, res) {
        data4 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time3, oxygen FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data4.rowCount,
            result:data4.rows,
        })
        console.log("[REST-API DIPASENA] GET :60 DATA CHART DO ");
    },
    // CHART Salinitas 
    async getDataChartSalinitas(req, res) {
        data5 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time4, salinitas FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data5.rowCount,
            result:data5.rows,
        })
        console.log("[REST-API DIPASENA] GET :60 DATA CHART SALINITAS");
    },
    // CHART Suhu Ruanng
    async getDataChartSuhuRuang(req, res) {
        data6 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time5, suhu_ruang FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data6.rowCount,
            result:data6.rows,
        })
        console.log("[REST-API DIPASENA] GET :60 DATA CHART SUHU RUANG");
    },
    // CHART Amonia
    async getDataChartAmonia(req, res) {
        data7 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time6, amonia FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data7.rowCount,
            result:data7.rows,
        })
        console.log("[REST-API DIPASENA]GET :60 DATA CHART AMONIA");
    },
    // CHART TINGGI AIR 
    async getDataChartTinggiAir(req, res) {
        data8 = await dbase_rest.query(`SELECT to_char(time, 'HH24:MI:SS') as time7, tinggi_air FROM tambak_dipasena ORDER BY time DESC LIMIT 60`);

        res.status(200);
        res.send({
            count:data8.rowCount,
            result:data8.rows,
        })
        console.log("[REST-API DIPASENA]GET :60 DATA CHART TINGGI AIR");
    },

    // Handle data Fluktuasi PH selama 6 jam terakhir 
    async get_ph_fluctuation(req, res){
        var data = [];
        var ph_values = [];

        dbase_rest.query(`SELECT time, ph
        FROM tambak_dipasena WHERE time >= now() - Interval '6 hours ' ORDER BY time DESC`, function(err, result){
            if (err) {
                console.log(err.message);
                res.status(500);
                res.json({msg: `Error executing query: ${err.message}`});
                return;
            }
            if (result.rowCount == 0) {
                res.status(404);
                res.json({msg: "No data found in the last hour"});
                return;
            }
            for (i = 0; i<result.rowCount; i++){
                const timeGMT7 = (moment(result.rows[i].time).locale('id').format());
                data.push({
                    "time": timeGMT7,
                    "ph": result.rows[i].ph
                })
                ph_values.push(result.rows[i].ph);
            }

            // Calculate fluctuation
            var max_ph = Math.max(...ph_values);
            var min_ph = Math.min(...ph_values);
            var fluctuation = max_ph - min_ph;

            res.json({
                count:result.rowCount,
                fluctuation: fluctuation,
                max_Ph : max_ph,
                min_Ph : min_ph,
                result: data.reverse(),
            })
            console.log(`[REST-API DIPASENA] GET ALL DATA PH DURING 6 hours  FOR FLUCTUAYION PH`);
        });
    },

    // Handle data Fluktuasi Suhu Permukaan selama 6 jam terakhir 
    async get_suhuAir_fluc(req, res){
        var data = [];
        var suhuPer_values = [];
        var suhuDas_values = [];

        dbase_rest.query(`SELECT time, suhu_air_permukaan,suhu_air_dasar
        FROM tambak_dipasena WHERE time >= now() - Interval '6 hours ' ORDER BY time DESC`, function(err, result){
            if (err) {
                console.log(err.message);
                res.status(500);
                res.json({msg: `Error executing query: ${err.message}`});
                return;
            }
            if (result.rowCount == 0) {
                res.status(404);
                res.json({msg: "No data found in the last hour"});
                return;
            }
            for (l = 0; l<result.rowCount; l++){
                const timeGMT7 = (moment(result.rows[l].time).locale('id').format());
                data.push({
                    "time": timeGMT7,
                    "suhu_air_permukaan": result.rows[l].suhu_air_permukaan,
                    "suhu_air_dasar": result.rows[l].suhu_air_dasar
                })
                suhuPer_values.push(result.rows[l].suhu_air_permukaan);
                suhuDas_values.push(result.rows[l].suhu_air_dasar);
            }

            // Calculate fluctuation Suhu dasar
            var max_suhuDas = Math.max(...suhuDas_values);
            var min_suhuDas = Math.min(...suhuDas_values);
            var fluctuationDasar = max_suhuDas - min_suhuDas;
            // Calculate fluctuation Suhu Permukaan 
            var max_suhuPer = Math.max(...suhuPer_values);
            var min_suhuPer = Math.min(...suhuPer_values);
            var fluctuationPermukaan = max_suhuPer - min_suhuPer;
            // Calculation fluctuation Suhu Rata-Rata 
            var max_suhuRata = max_suhuDas + max_suhuPer/2;
            var min_suhuRata = min_suhuDas + max_suhuPer/2;
            var fluctuationSuhuRata = max_suhuRata - min_suhuRata;


            res.json({
                count:result.rowCount,
                fluctuationDasar: fluctuationDasar,
                fluctuationPermukaan: fluctuationPermukaan,
                fluctuationSuhuRataRata: fluctuationSuhuRata,
                max_SuhuDasar : max_suhuDas,
                min_SuhuDasar : min_suhuDas,
                max_SuhuPermukaan : max_suhuPer,
                min_SuhuPermukaan : min_suhuPer,
                max_SuhuRataRata : max_suhuRata,
                min_SuhuRataRata:min_suhuRata,
                result: data.reverse(),
            })
            console.log(`[REST-API DIPASENA] GET ALL DATA DURING 6 hour FOR FLUCTUATION SUHU AIR `);
        });
    },


    // Handle Berdasarkan Waktu : 
    async get_byTime_obj(req, res){
        time = req.params.time;
        timer = req.query.timer;
        dataColumn = req.query.data;
        if (timer == "second" || timer == "minute" || timer == "hour" || timer == "day"){
            dbase_rest.query(`SELECT time, ${dataColumn} as data
            FROM tambak_dipasena WHERE time >= now() - Interval '${time}' ${req.query.timer} ORDER BY time DESC`, function(err, result){
                if (err) {
                    console.log(err.message);
                    res.status(404);
                    res.json({msg: `Error no column ${dataColumn} or Error time format. use available column : suhu_air_permukaan, suhu_air_dasar, suhu_ruang, salinitas, oxygen, salinitas, ph, amonia use time format <time>?timer=interval. Example "/1?time=day&data=salinitas"`});
                } 
                res.json({
                    count:result.rowCount,
                    result: result.rows.reverse(),
                })
                console.log(`[REST-API Panjang] GET ${dataColumn} FOR ${time} ${timer} AS OBJECT`);
            });
        }else {
            res.status(404);
            res.json({
                message:"Invalid Timer. Use second, minute, hour, day",
            })
        };
    },
}

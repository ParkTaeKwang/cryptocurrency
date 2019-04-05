    // 로그인 폼
    router.get('/login', (req, res)=>{
        // 로그인 되어있다면...
        if(req.session.login_member) {
            res.redirect('/boardList');
        } else {
            res.render('login');
        }
    });
    // 로그인 액션
    router.post('/login', (req, res)=>{
        const member_id = req.body.member_id;
        const member_pw = req.body.member_pw;
        /*
            SELECT member_id, member_name
            FROM member
            WHERE member_id=? AND member_pw=?
        */
        conn.query('SELECT member_id, member_name FROM member WHERE member_id=? AND member_pw=?', 
                    [member_id, member_pw], 
                    (err, rs)=>{ 
                        if(rs.length == 0) {
                            console.log('로그인 실패'); 
                            res.redirect('/login');
                        } else {  
                            console.log('로그인 성공');    
                            // session에 저장
                            req.session.login_member = {
                                member_id:rs[0].member_id, 
                                member_name:rs[0].member_name
                            };
                            console.log(req.session.login_member.member_name);
                            res.redirect('/boardList');
                        }                       
        }); 
    });
    // 로그아웃
    router.get('/logout', (req, res)=>{
        req.session.destroy((err)=>{
            res.redirect('/login');
        });
    })

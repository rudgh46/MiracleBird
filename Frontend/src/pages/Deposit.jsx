import React, {useState} from "react";
import styles from "./Deposit.module.css";
import Modal from "react-bootstrap/Modal";

function Deposit () {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const CATEGORY = [
        {id:0, data :'미라클 모닝', cost:2},
        {id:1, data :'운동', cost:2},
        {id:2, data :'스터디', cost:2},
    ]

    const [checkedList, setCheckedList] = useState([]);
    
    const onCheckedElement = (checked, item) => {
        if (checked) {
            setCheckedList([...checkedList, item])
        } else if (!checked) {
            setCheckedList(checkedList.filter(el => el !== item));
        }
    };

    const onRemove = item => {
        setCheckedList(checkedList.filter(el => el !== item))
    }

    
    console.log(checkedList.length)
    return (
        <>
        <div className={styles.Header}>
            <button className={styles.backbtn} onClick={()=>(history.back())}><img alt="back" src="/back.png" className={styles.backicon} /></button>
            <div className={styles.headerText}>
                Deposit
            </div>
        </div>

        <div className={styles.Content}>
            <div className={styles.contextheader}>
                챌린지 달성률 85% 이상 시 참가비 전액을 돌려드려요!
            </div>
            <div className={styles.contextdetail}>
                챌린지 인증 시 획득하는 MIRA의 양이 2배가 됩니다!
            </div>
            <div className={styles.imgCt}>
                <img alt="morning" src="/morning.png" className={styles.morningicon}/>
                <img alt="health" src="/exercise.png" className={styles.healthicon}/>
                <img alt="study" src="/studying.png" className={styles.studyicon}/>
            </div>
            <div className={styles.detailCt}>
                <div className={styles.detailline}>
                    <div className={styles.detail1}>챌린지 100% 성공</div>
                    <div className={styles.detail2}>참가비 x 1.2</div>
                </div>
                <div className={styles.detailline}>
                    <div className={styles.detail1}>챌린지 85% 이상 성공</div>
                    <div className={styles.detail2}>참가비 전액</div>
                </div>
                <div className={styles.detailline}>
                    <div className={styles.detail1}>챌린지 85% 미만 성공</div>
                    <div className={styles.detail2}>성공률에 따라 다름</div>
                </div>
            </div>
        </div>

        <div className={styles.selectCategory}>
            <div className={styles.checkboxCt}>
                { CATEGORY.map(item => {
                    return (
                        <label key={item.id} className={styles.checkboxs} >
                            <input name="chkbox" type="checkbox" value={item.data} className={styles.boxs}
                            onChange={e => {onCheckedElement(e.target.checked, e.target.value)}}
                            checked={checkedList.includes(item.data) ? true: false}></input>
                            <div>{item.data}</div>
                        </label>
                    )
                }) }
            </div>
            <div className={styles.selectboxsCt}>
                <div className={styles.selectboxCt}>
                    {checkedList.length === 0 && (
                        <div className={styles.categorytext}>카테고리를 선택해주세요.</div>
                    )}
                    {checkedList.map(item => {
                        return (
                            <label key={item} className={styles.selectboxs}>
                                <div className={styles.labelname}>{item}</div>
                                <button onClick={()=> onRemove(item)} className={styles.closeBtn}>x</button>
                            </label>
                            
                        )
                    })}
                </div>
                <div className={styles.costBox}>
                    <div>참가비</div>
                    <div className={styles.costText}>{checkedList.length * 0.11} ETH</div>
                    <button className={styles.costBtn} onClick={handleShow}>결제하기</button>
                </div>
            </div>
        </div>
        
        <Modal
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header className={styles.modalheader} closeButton></Modal.Header>
        <Modal.Body className={styles.modalcontent}>
            정규 시즌에 만나요!
        </Modal.Body>
        <Modal.Footer className={styles.modalheader}></Modal.Footer>
      </Modal>

        </>
    )
}

export default Deposit;
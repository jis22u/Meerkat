package B107.server.meerkat.exception;

public class MyPageHistoryException extends MeerkatServerException {
    public MyPageHistoryException(ErrorCode errorCode) {
        super(errorCode.MYPAGE_HISTORY_ERROR);
    }
}
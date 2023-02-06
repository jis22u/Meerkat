package B107.server.meerkat.exception;

public class MemberNotFoundException extends MeerkatServerException {
    public MemberNotFoundException(ErrorCode errorCode) {
        super(errorCode.MEMBER_NOT_FOUND);
    }
}

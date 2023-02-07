package B107.server.meerkat.exception;

public class MemberAlreadyExistException extends MeerkatServerException {
    public MemberAlreadyExistException(ErrorCode errorCode) {
        super(errorCode.MEMBER_ALREADY_EXIST);
    }
}

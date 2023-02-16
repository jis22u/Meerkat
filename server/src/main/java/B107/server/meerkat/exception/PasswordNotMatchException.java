package B107.server.meerkat.exception;

public class PasswordNotMatchException extends MeerkatServerException {
    public PasswordNotMatchException(ErrorCode errorCode) {
        super(errorCode.PW_NOT_MATCH);
    }
}

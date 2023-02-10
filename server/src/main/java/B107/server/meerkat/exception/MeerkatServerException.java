package B107.server.meerkat.exception;

import lombok.Getter;

@Getter
public class MeerkatServerException extends RuntimeException {
    private ErrorCode errorCode;

    public MeerkatServerException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }


}

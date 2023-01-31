package B107.server.meerkat.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonFormat(shape = JsonFormat.Shape.STRING)
public enum ErrorCode {
    MEMBER_NOT_FOUND(404, "회원 정보를 찾을 수 없습니다.");

    private final int status;
    private final String message;
}

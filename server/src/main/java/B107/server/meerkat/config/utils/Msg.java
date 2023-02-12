package B107.server.meerkat.config.utils;

/**
 * 컨트롤러,필터 성공/실패 MSG
 */
public interface Msg {

	String SUCCESS_CREATE_ROOM = "방 생성에 성공하였습니다.";
	String SUCCESS_LIST_ROOM = "방 목록 조회에 성공하였습니다.";
	String SUCCESS_DETAIL_ROOM = "방 목록 상세조회에 성공하였습니다.";

	// spring security, interceptor
	String SUCCESS_SIGN_IN = "로그인에 성공하였습니다.";
	String SUCCESS_SIGN_OUT = "로그아웃에 성공하였습니다.";
	String SUCCESS_TOKEN_VALIDATE = "토큰 검증에 성공하였습니다.";
	String SUCCESS_MEMBER_ROLE = "유저 역할 확인에 성공하였습니다.";
	String SUCCESS_ACCESS = "서버 접근에 성공하였습니다.";

	String FAIL_SIGN_IN = "로그인에 실패하였습니다.";
	String FAIL_SIGN_OUT = "로그아웃에 실패하였습니다.";
	String FAIL_TOKEN_VALIDATE = "토큰 검증에 실패하였습니다.";
	String FAIL_MEMBER_ROLE = "유저 역할 확인에 실패하였습니다.";
	String FAIL_ACCESS = "서버 접근에 실패하였습니다.";
	String FAIL_UNVERIFIED_SERVER_ADDRESS = "잘못된 주소로 접근하였습니다.";

	// admin
	String SUCCESS_MEMBER_REGISTER = "회원 등록에 성공하였습니다.";
	String SUCCESS_MEMBER_MOD = "회원 정보 수정에 성공하였습니다.";
	String SUCCESS_MEMBER_MODPW = "회원 비밀번호 수정에 성공하였습니다.";

	String FAIL_ADMIN_REGISTER = "관리자가 회원 등록에 실패하였습니다.";
	String FAIL_ADMIN_FIND_ALL = "회원 전체 예약 현황 조회에 실패하였습니다.";

	// member
	String SUCCESS_MEMBER_PROFILE = "회원 프로필 조회에 성공하였습니다.";
	String FAIL_MEMBER_PROFILE = "회원 프로필 조회에 실패하였습니다.";
	String SUCCESS_MEMBER_MYPAGE= "회원 마이 페이지 조회에 성공하였습니다.";
	String FAIL_MEMBER_MYPAGE= "회원 마이 페이지 조회에 실패하였습니다.";

	// marker
	String SUCCESS_MARKER_REGISTER = "미어캣 마커 등록에 성공하였습니다.";
	String SUCCESS_MARKER_READ = "미어캣 마커 조회에 성공하였습니다.";
	String SUCCESS_MARKER_DELETE = "미어캣 마커 삭제에 성공하였습니다.";
	String SUCCESS_MARKER_UPDATE = "등록 내역 수정에 성공하였습니다.";

	String FAIL_MARKER_REGISTER = "등록한 미어캣 마커가 이미 존재합니다.";
	String FAIL_MARKER_DELETE = "삭제 권한이 없습니다.";
	String FAIL_MARKER_UPDATE = "수정 권한이 없습니다.";

	// call
	String SUCCESS_CALL_REGISTER = "요청 등록에 성공하였습니다.";
	String FAIL_CALL_REGISTER = "등록한 요청이 이미 존재합니다.";
	String SUCCESS_CALL_FIND = "제공 가능 미어캣 목록 호출에 성공했습니다.";

	// room
	String SUCCESS_ROOM_JOIN = "입장 가능한 방입니다.";
	String FAIL_ROOM_CLOSED = "폐쇄된 방입니다.";

	// coin
	String SUCCESS_COIN_CHARGE = "코인 충전에 성공하였습니다.";
}

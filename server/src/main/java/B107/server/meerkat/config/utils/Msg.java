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

	// marker
	String SUCCESS_MARKER_REGISTER = "미어캣 마커 등록에 성공하였습니다.";
	String SUCCESS_MARKER_DELETE = "미어캣 마커 삭제에 성공하였습니다.";
	String SUCCESS_MARKER_UPDATE = "미어캣 마커 수정에 성공하였습니다.";

	String FAIL_MARKER_REGISTER = "이미 등록된 미어캣 마커가 있습니다.";
}

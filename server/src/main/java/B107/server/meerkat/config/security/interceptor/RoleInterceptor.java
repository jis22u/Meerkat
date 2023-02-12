package B107.server.meerkat.config.security.interceptor;

import B107.server.meerkat.config.jwt.JwtTokenProvider;
import B107.server.meerkat.config.security.handler.DecodeEncodeHandler;
import B107.server.meerkat.config.security.handler.ResponseHandler;
import B107.server.meerkat.dto.token.TokenResDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static B107.server.meerkat.config.utils.Msg.*;


/**
 * 지정되지 않은 모든 URL 을 가져와 검사
 * URL 이 /admin, /emp 인지 그 외인지 검사하여 boolean 리턴
 */

@Slf4j
@Component
public class RoleInterceptor implements HandlerInterceptor {
	private static final String METHOD_NAME = RoleInterceptor.class.getName();
	private final DecodeEncodeHandler decodeEncodeHandler;
	private final JwtTokenProvider jwtTokenProvider;
	private final String adminRole;
	private final String memberRole;
	private final String markerRole;
	private final String callRole;
	private final String roomRole;

	private final String adminURL;
	private final String memberURL;
	private final String markerURL;
	private final String callURL;
	private final String roomURL;

	@Autowired
	public RoleInterceptor(DecodeEncodeHandler decodeEncodeHandler, JwtTokenProvider jwtTokenProvider,
						   @Value(value = "${user.role.admin}") String adminRole,
						   @Value(value = "${user.role.member}") String memberRole,
						   @Value(value = "${user.role.marker}") String markerRole,
						   @Value(value = "${user.role.call}") String callRole,
						   @Value(value = "${user.role.room}") String roomRole,
						   @Value(value = "${user.url.admin}") String adminURL,
						   @Value(value = "${user.url.member}") String memberURL,
						   @Value(value = "${user.url.marker}") String markerURL,
						   @Value(value = "${user.url.call}") String callURL,
						   @Value(value = "${user.url.room}") String roomURL) {
		this.decodeEncodeHandler = decodeEncodeHandler;
		this.jwtTokenProvider = jwtTokenProvider;
		this.adminRole = adminRole;
		this.memberRole = memberRole;
		this.markerRole = markerRole;
		this.callRole = callRole;
		this.roomRole = roomRole;
		this.adminURL = adminURL;
		this.memberURL = memberURL;
		this.markerURL = markerURL;
		this.callURL = callURL;
		this.roomURL = roomURL;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//		System.out.println("여기 왔니");
		log.info(METHOD_NAME + "- preHandle() ...");
		boolean result = false;
		try {
			TokenResDTO tokenResDTO = jwtTokenProvider.requestCheckToken(request);
			String token = tokenResDTO.getToken();
			Outer:
			{
				if (jwtTokenProvider.validateToken(token)) {
//					System.out.println("여기 왔니");   OOO
					log.info("Token validate - success");
					String memberId = jwtTokenProvider.getUserPk(token);

					if (decodeEncodeHandler.memberIdValid(memberId)) {
						log.info("Member validate - Success");
						String role = decodeEncodeHandler.roleValid(memberId);
//						System.out.println("여기 왔니"); OOO
						if (request.getRequestURI().startsWith(adminURL)) {
//							System.out.println("여기 왔니");    XXXX
							log.info("ADMIN role validate ...");
							if (role != null && role.equals(adminRole)) {
								log.info("ADMIN role validate - Success");
								result = true;
							} else {
								log.warn("ADMIN role validate - Fail");
								response.setContentType("text/html; charset=UTF-8");
								response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
							}
							break Outer;
						}
						if (request.getRequestURI().startsWith(memberURL)) {
//							System.out.println("여기 왔니");  XXXX
							log.info("MEMBER role validate ...");
							if (role != null && (role.equals(memberRole) || role.equals(adminRole))) {
								log.info("MEMBER role validate - Success");
								result = true;
							} else {
								log.warn("MEMBER role validate - Fail");
								response.setContentType("text/html; charset=UTF-8");
								response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
							}
							break Outer;
						}
						if (request.getRequestURI().startsWith(markerURL)) {
//							System.out.println("여기 왔니");  XXXX
							log.info("MEMBER role validate ...");
							if (role != null && (role.equals(memberRole) || role.equals(adminRole) || role.equals(markerRole))) {
								log.info("MEMBER role validate - Success");
								result = true;
							} else {
								log.warn("MEMBER role validate - Fail");
								response.setContentType("text/html; charset=UTF-8");
								response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
							}
							break Outer;
						}
						if (request.getRequestURI().startsWith(callURL)) {
//							System.out.println("여기 왔니");  XXXX
							log.info("MEMBER role validate ...");
							if (role != null && (role.equals(memberRole) || role.equals(adminRole) || role.equals(markerRole) || role.equals(callRole))) {
								log.info("MEMBER role validate - Success");
								result = true;
							} else {
								log.warn("MEMBER role validate - Fail");
								response.setContentType("text/html; charset=UTF-8");
								response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
							}
							break Outer;
						}
						if (request.getRequestURI().startsWith(roomURL)) {
//							System.out.println("여기 왔니");  XXXX
							log.info("MEMBER role validate ...");
							if (role != null && (role.equals(memberRole) || role.equals(adminRole) || role.equals(markerRole) || role.equals(callRole) || role.equals(roomRole))) {
								log.info("MEMBER role validate - Success");
								result = true;
							} else {
								log.warn("MEMBER role validate - Fail");
								response.setContentType("text/html; charset=UTF-8");
								response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
							}
							break Outer;
						}
						System.out.println("여기 왔니");
						log.warn("Unverified role ACCESS ... ");
						response.setContentType("text/html; charset=UTF-8");
						response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_UNVERIFIED_SERVER_ADDRESS));
					} else {
//						System.out.println("여기 왔니");  XXX
						log.warn("Request User is not exist " + METHOD_NAME);
						response.setContentType("text/html; charset=UTF-8");
						response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_MEMBER_ROLE));
					}
				} else {
//					System.out.println("여기 왔니");   당연 XXX
					log.warn("Token validate - Fail");
					response.setContentType("text/html; charset=UTF-8");
					response.getWriter().write(new ResponseHandler().convertResult(HttpStatus.BAD_REQUEST, FAIL_TOKEN_VALIDATE));
				}
			}
			return result;
		} catch (IOException ie) {
			log.error("역할이 입력되지 않았습니다. " + METHOD_NAME, ie);
		} catch (NullPointerException ne) {
			log.error("역할이 존재하지 않습니다. " + METHOD_NAME, ne);
		} catch (Exception e) {
			log.error("SERVER ERROR " + METHOD_NAME, e);
		}
		return false;
	}
}

package B107.server.meerkat.config.socket;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// 2


@Configuration
public class SocketIOConfig {

	@Value("${socket-server.host}")
	private String host;

	@Value("${socket-server.port}")
	private Integer port;

	@Bean
	public SocketIOServer socketIOServer() {

		System.out.println("2 SocketIOConfig");

		com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
		config.setHostname(host);
		config.setPort(port);
		config.setOrigin("https://i8b107.p.ssafy.io");
//		config.setOrigin("https://i8b107.p.ssafy.io/open");
		config.setOrigin("http://i8b107.p.ssafy.io:8085");
		config.setOrigin("http://i8b107.p.ssafy.io:3000");

//		config.setContext("/open");
		return new SocketIOServer(config);
	}

}

package B107.server.meerkat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@ComponentScan(basePackages = {"B107.server.meerkat.repository"})
@EnableJpaRepositories(basePackages = {"B107.server.meerkat.entity"})
@SpringBootApplication
public class MeerkatApplication {

	public static void main(String[] args) {
		SpringApplication.run(MeerkatApplication.class, args);
	}

}

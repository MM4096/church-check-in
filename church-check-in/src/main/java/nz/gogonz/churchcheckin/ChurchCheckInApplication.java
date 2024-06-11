package nz.gogonz.churchcheckin;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@SpringBootApplication
@Configuration
public class ChurchCheckInApplication {
	@Value("${spring.datasource.url}")
	private String POSTGRES_URL;

	@Value("${spring.datasource.username}")
	private String POSTGRES_USER;

	@Value("${spring.datasource.password}")
	private String POSTGRES_PASSWORD;

	Logger logger = LoggerFactory.getLogger(ChurchCheckInApplication.class);

	@PostConstruct
	public void printDBConfig() {
		logger.info("*************************************************************");
        logger.info("POSTGRES_URL: {}", POSTGRES_URL);
        logger.info("POSTGRES_USER: {}", POSTGRES_USER);
        logger.info("POSTGRES_PASSWORD: {}", POSTGRES_PASSWORD);
		logger.info("*************************************************************");
	}

	public static void main(String[] args) {
		SpringApplication.run(ChurchCheckInApplication.class, args);
	}

}

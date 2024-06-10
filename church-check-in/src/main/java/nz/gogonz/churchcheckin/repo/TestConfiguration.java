package nz.gogonz.churchcheckin.repo;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@ComponentScan(basePackages = "nz.gogonz.churchcheckin")
@EntityScan(basePackages = "nz.gogonz.churchcheckin")
@EnableJpaRepositories(basePackages = "nz.gogonz.churchcheckin")
public class TestConfiguration {

}

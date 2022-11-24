package com.ssafy.miraclebird;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@PropertySource(value = { "classpath:database/database.properties" })
@PropertySource(value = { "classpath:oauth2/oauth2.properties" })
@PropertySource(value = { "classpath:swagger/springdoc.properties" })
public class MiraclebirdApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiraclebirdApplication.class, args);
	}

}

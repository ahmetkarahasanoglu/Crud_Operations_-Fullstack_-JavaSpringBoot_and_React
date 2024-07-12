package com.ahmet.config;

import org.springframework.context.annotation.Configuration;
import org.springdoc.core.SpringDocUtils;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@Configuration
@OpenAPIDefinition(info = @Info(title = "Your Application API", version = "1.0", description = "APIs for your application"))
public class OpenAPIConfig {

    static {
        SpringDocUtils.getConfig().addAnnotationsToIgnore(
                org.springframework.boot.autoconfigure.EnableAutoConfiguration.class,
                org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration.class,
                org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class);
    }
}

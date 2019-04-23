package com.bsuir.kareley.configuration;

import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletRegistration;

public class ServletInitializer implements WebApplicationInitializer {

    private static final String SERVLET_NAME = "dispatcher";
    private static final String URL_PATTERN = "/";

    @Override
    public void onStartup(ServletContext servletContext) {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(ApplicationConfiguration.class);
        context.setServletContext(servletContext);

        ServletRegistration.Dynamic dispatcher = servletContext.addServlet(SERVLET_NAME, new DispatcherServlet(context));
        dispatcher.addMapping(URL_PATTERN);
    }

}

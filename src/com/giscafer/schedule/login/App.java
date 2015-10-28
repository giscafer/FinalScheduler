package com.giscafer.schedule.login;


import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {
        //ApplicationContext appContext = new AnnotationConfigApplicationContext("cn.outofmemory.helloannotation");

        ApplicationContext appContext = new ClassPathXmlApplicationContext("/spring.xml");
//        CarService service = appContext.getBean(CarService.class);
//        service.addCar("±¦Âí");
    }
}
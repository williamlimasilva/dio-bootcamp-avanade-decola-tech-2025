package br.com.dio.barbershopapi.exceptionhandler;

import br.com.dio.barbershopapi.controller.response.ProblemResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.OffsetDateTime;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;


@Log4j2
@ControllerAdvice
public class ApplicationExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUncaught(final Exception e, final WebRequest request){
        log.error("handleUncaught: ", e);
        HttpStatus status = INTERNAL_SERVER_ERROR;
        ProblemResponse response = ProblemResponse.builder()
                .status(status.value())
                .timestamp(OffsetDateTime.now())
                .message(e.getMessage())
                .build();
        return handleExceptionInternal(e, response, new HttpHeaders(), status, request);
    }
}

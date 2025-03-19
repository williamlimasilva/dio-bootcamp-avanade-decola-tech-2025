package br.com.dio.barbershopapi.service.query;

import br.com.dio.barbershopapi.entity.ClientEntity;

import java.util.List;

public interface ClientQueryServiceInterface {

    ClientEntity findById(final Long id);

    List<ClientEntity> list();

    void verifyPhone(final String phone);

    void verifyPhone(final long id,final String phone);

    void verifyEmail(final String email);

    void verifyEmail(final long id,final String email);
}

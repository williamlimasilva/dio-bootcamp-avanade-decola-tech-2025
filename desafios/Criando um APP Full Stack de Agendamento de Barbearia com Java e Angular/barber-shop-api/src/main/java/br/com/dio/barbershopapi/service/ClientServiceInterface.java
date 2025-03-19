package br.com.dio.barbershopapi.service;

import br.com.dio.barbershopapi.entity.ClientEntity;

public interface ClientServiceInterface {

    ClientEntity save(final ClientEntity client);

    ClientEntity update(final ClientEntity client);

    void delete(final Long id);
}

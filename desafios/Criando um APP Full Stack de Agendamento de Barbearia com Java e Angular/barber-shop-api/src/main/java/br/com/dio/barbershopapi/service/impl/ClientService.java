package br.com.dio.barbershopapi.service.impl;

import br.com.dio.barbershopapi.entity.ClientEntity;
import br.com.dio.barbershopapi.repository.ClientRepositoryInterface;
import br.com.dio.barbershopapi.service.ClientServiceInterface;
import br.com.dio.barbershopapi.service.query.ClientQueryServiceInterface;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class ClientService implements ClientServiceInterface {

    private final ClientRepositoryInterface repository;
    private final ClientQueryServiceInterface queryService;

    @Override
    public ClientEntity save(final ClientEntity client) {
        queryService.verifyPhone(client.getPhone());
        queryService.verifyEmail(client.getEmail());
        return repository.save(client);
    }

    @Override
    public ClientEntity update(final ClientEntity client) {
        queryService.verifyPhone(client.getId(), client.getPhone());
        queryService.verifyEmail(client.getId(), client.getEmail());

        ClientEntity stored = queryService.findById(client.getId());
        stored.setName(client.getName());
        stored.setPhone(client.getPhone());
        stored.setEmail(client.getEmail());
        return repository.save(stored);
    }

    @Override
    public void delete(final Long id) {
        queryService.findById(id);
        repository.deleteById(id);

    }
}

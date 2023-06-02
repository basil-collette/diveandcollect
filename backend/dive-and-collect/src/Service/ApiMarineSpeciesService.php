<?php

namespace App\Service;

use App\Entity\Specie;
use App\Repository\SpecieRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ApiMarineSpeciesService
{

    public function __construct(
        private SpecieRepository $specieRepository,
        private HttpClientInterface $client,
        private EntityManagerInterface $entityManager
    ) {
    }

    /**
     * Récupérer les données de l'API (avec pagination)
     */
    public function getData($offset = 1): array
    {
        return $this->client->request(
            'GET',
            'https://www.marinespecies.org/rest/AphiaRecordsByVernacular/fishes?like=true&offset=' . $offset,
            // ['Accept' => 'application/json']
        )->toArray();
    }

    /**
     * Créer des Species à partir des données de l'API
     */
    public function createFromData()
    {
        $data = $this->getData();

        $nb = 0;
        foreach ($data as $d) {
            $specie = new Specie();

            $specie->setName($d["valid_name"]);
            $specie->setSpecieKey($d["AphiaID"]);
            $specie->setScientificName($d["scientificname"]);
            $specie->setlocation("[" . mt_rand(1, 10) . "," . mt_rand(1, 10) . "," . mt_rand(1, 10) . "]");

            $this->entityManager->persist($specie);
            $nb++;
        }
        $this->entityManager->flush();

        return $nb;
    }
}

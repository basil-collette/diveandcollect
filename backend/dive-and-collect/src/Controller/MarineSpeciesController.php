<?php

namespace App\Controller;

use App\Service\ApiMarineSpeciesService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class MarineSpeciesController extends AbstractController
{
    #[Route('/marinespecies/save', name: 'marinespecies', methods: ['POST'])]
    public function index(ApiMarineSpeciesService $apiMarineSpeciesService): \Symfony\Component\HttpFoundation\JsonResponse
    {
        $response = $apiMarineSpeciesService->createFromData();
        return $this->json($response);
    }
}

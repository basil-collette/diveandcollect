<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class PictureUrlController extends AbstractController
{
    /**
     * @Route("/assets/uploads/{filename}", name="public_images_show")
     */
    public function show(string $filename): Response
    {
        $imagePath = 'assets/uploads/' . $filename;
        $response = new Response();
        $response->headers->set('Content-Type', 'image/png');
        $response->setContent($imagePath);

        return $response;
    }
}

<?php

namespace App\Controller;
use App\Entity\DivingEvent;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class DivingEventCardController extends AbstractController
{

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function __invoke(DivingEvent $divingEvent): Response
    {
        $json=[];
        $json["id"] = $divingEvent->getId();
        $json["dive"] = $divingEvent->getDive();
        $json["inventory"] = $divingEvent->getInventory();
        $json["picture"] = $this->urlGenerator->generate("public_images_show",["filename" =>$divingEvent->getPicture()], UrlGeneratorInterface::ABSOLUTE_URL);

        $response = new Response(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}

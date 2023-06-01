<?php

namespace App\Controller;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UserProfilController extends AbstractController
{

    public function __construct(UrlGeneratorInterface $urlGenerator)
    {
        $this->urlGenerator = $urlGenerator;
    }

    public function __invoke(User $user): Response
    {
        $json=[];
        $json["id"] = $user->getId();
        $json["email"] = $user->getEmail();
        $json["name"] = $user->getName();
        $json["language"] = $user->getLanguage();
        $json["avatar"] = $this->urlGenerator->generate("public_images_show",["filename" =>$user->getAvatar()], UrlGeneratorInterface::ABSOLUTE_URL);

        $response = new Response(json_encode($json));
        $response->headers->set('Content-Type', 'application/json');

        return $response;
    }

}
<?php

namespace App\Controller;
use App\Entity\DivingEvent;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class DivingEventController extends AbstractController
{

    public function __construct(private readonly EntityManagerInterface $em)
    {

    }
    public function __invoke(DivingEvent $divingEvent, Request $request, UrlGeneratorInterface $urlGenerator)
    {
        $pictureDatas = $request->getContent();
        $pictureName = uniqid() . '.jpg';
        $destinationPath = "assets/uploads/" . $pictureName;
        $arr = json_decode($pictureDatas,true);
        file_put_contents($destinationPath,base64_decode($arr['base']));
        $divingEvent->setPicture($pictureName);
        $this->em->persist($divingEvent);
        $this->em->flush();



        return $divingEvent;
    }

}

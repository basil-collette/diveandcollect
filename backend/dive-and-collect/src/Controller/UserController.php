<?php

namespace App\Controller;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class UserController extends AbstractController
{

    public function __construct(private readonly EntityManagerInterface $em)
    {

    }
    public function __invoke(User $user, Request $request, UrlGeneratorInterface $urlGenerator)
    {
        $pictureDatas = $request->getContent();
        $pictureName = uniqid() . '.jpg';
        $destinationPath = "assets/uploads/" . $pictureName;
        $arr = json_decode($pictureDatas,true);
        file_put_contents($destinationPath,base64_decode($arr['base']));
        $user->setAvatar($pictureName);
        $this->em->persist($user);
        $this->em->flush();



    return $user;
    }

}

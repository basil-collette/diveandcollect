<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\User;
use App\Entity\Dive;
use App\Entity\DiveBook;
use App\Entity\DivingEvent;
use App\Entity\Inventory;
use App\Entity\Specie;
use App\Controller\Admin\UserCrudController;
use App\Controller\Admin\DiveCrudController;
use App\Controller\Admin\DiveBookCrudController;
use App\Controller\Admin\DivingEventCrudController;
use App\Controller\Admin\InventoryCrudController;
use App\Controller\Admin\SpecieCrudController;


class DashboardController extends AbstractDashboardController
{
    public function __construct(private AdminUrlGenerator $adminUrlGenerator)
    {
        $this->$adminUrlGenerator = $adminUrlGenerator;
    }
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        $url = $this->adminUrlGenerator->setController(UserCrudController::class)->generateURL();
        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Dive & Collect');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::section('Utilisateurs');
        yield MenuItem::linkToCrud('Utilisateurs', 'fa fa-user', User::class);
        yield MenuItem::section('Carnets de plongée');
        yield MenuItem::linkToCrud('Carnets de plongée', 'fa fa-user', DiveBook::class);
        yield MenuItem::section('Plongées');
        yield MenuItem::linkToCrud('Plongées', 'fa fa-user', Dive::class);
        yield MenuItem::section('Identifications');
        yield MenuItem::linkToCrud('Identifications', 'fa fa-user', Inventory::class);
        yield MenuItem::section('Espèces');
        yield MenuItem::linkToCrud('Espèces', 'fa fa-user', Specie::class);
        yield MenuItem::section('Evenements de plongée');
        yield MenuItem::linkToCrud('Evenements de plongée', 'fa fa-user', DivingEvent::class);
    }
}
